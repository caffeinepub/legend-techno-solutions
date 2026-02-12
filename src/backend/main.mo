import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


// Perform explicit migration to drop userProfiles.

actor {
  // Authorization.
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Contact Inquiry Management.
  type ContactInquiry = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactInquiry {
    public func compareByTimestamp(inquiry1 : ContactInquiry, inquiry2 : ContactInquiry) : Order.Order {
      Int.compare(inquiry2.timestamp, inquiry1.timestamp);
    };
  };

  let inquiries = Map.empty<Nat, ContactInquiry>();
  var nextId = 0;
  var nextRatingId = 0;

  func getNextId() : Nat {
    let id = nextId;
    nextId += 1;
    id;
  };

  public shared ({ caller }) func createInquiry(name : Text, email : Text, message : Text) : async () {
    // No authorization check - public contact form accessible to everyone including guests.
    let id = getNextId();
    let inquiry : ContactInquiry = {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    inquiries.add(id, inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [ContactInquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    inquiries.values().toArray().sort(ContactInquiry.compareByTimestamp);
  };

  public query ({ caller }) func getInquiry(id : Nat) : async ?ContactInquiry {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.get(id);
  };

  // Data-Driven Site Content Management.
  public type BusinessHours = {
    days : Text;
    hours : Text;
  };

  public type SiteContent = {
    heroHeading : Text;
    heroSubheading : Text;
    servicesHeading : Text;
    servicesDescription : Text;
    aboutHeading : Text;
    aboutDescription : Text;
    contactHeading : Text;
    contactSubheading : Text;
    businessHours : BusinessHours;
  };

  func defaultSiteContent() : SiteContent {
    {
      heroHeading = "ALGLOBE TECHNO SOLUTIONS";
      heroSubheading = "Empowering Your Digital Future";
      servicesHeading = "Our Services";
      servicesDescription = "We offer a range of services including digital transformation consulting, cloud solutions, and IT support.";
      aboutHeading = "About ALGLOBE TECHNO SOLUTIONS";
      aboutDescription = "ALGLOBE Technology Solutions is dedicated to helping businesses achieve their digital goals with innovative and reliable technology solutions.";
      contactHeading = "Get in Touch";
      contactSubheading = "Contact us to discuss how we can help your business thrive in the digital age.";
      businessHours = {
        days = "Monday - Friday";
        hours = "8:00 AM - 6:00 PM";
      };
    };
  };

  var siteContent : SiteContent = defaultSiteContent();

  public query ({ caller }) func getSiteContent() : async SiteContent {
    // No authorization check - public content for marketing site.
    siteContent;
  };

  public shared ({ caller }) func updateSiteContent(newContent : SiteContent) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update site content");
    };
    siteContent := newContent;
  };

  // Website Rating Feature.
  public type WebsiteRating = {
    id : Nat;
    rating : Nat; // 1-5
    comment : ?Text;
    timestamp : Time.Time;
  };

  module WebsiteRating {
    public func compareByTimestamp(rating1 : WebsiteRating, rating2 : WebsiteRating) : Order.Order {
      Int.compare(rating2.timestamp, rating1.timestamp);
    };
  };

  let ratings = Map.empty<Nat, WebsiteRating>();

  func getNextRatingId() : Nat {
    let id = nextRatingId;
    nextRatingId += 1;
    id;
  };

  public shared ({ caller }) func submitRating(rating : Nat, comment : ?Text) : async () {
    // No authorization check - public feature accessible to everyone including guests.
    if (rating < 1 or rating > 5) {
      Runtime.trap("Invalid rating. Must be between 1 and 5.");
    };

    let id = getNextRatingId();
    let newRating : WebsiteRating = {
      id;
      rating;
      comment;
      timestamp = Time.now();
    };
    ratings.add(id, newRating);
  };

  public query ({ caller }) func getAllRatings() : async [WebsiteRating] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all ratings");
    };
    ratings.values().toArray().sort(WebsiteRating.compareByTimestamp);
  };

  public query ({ caller }) func getRecentRatings(limit : Nat) : async [WebsiteRating] {
    // No authorization check - public feature for marketing site display.
    let sortedRatings = ratings.values().toArray().sort(WebsiteRating.compareByTimestamp);
    let actualLimit = if (limit > 0 and limit < sortedRatings.size()) { limit } else {
      sortedRatings.size();
    };
    sortedRatings.sliceToArray(0, actualLimit);
  };

  public query ({ caller }) func getAverageRating() : async ?Float {
    // No authorization check - public feature for marketing site display.
    let numRatings = ratings.size();
    if (numRatings == 0) {
      return null;
    };

    var sum : Nat = 0;
    for (rating in ratings.values()) {
      sum += rating.rating;
    };

    ?(sum.toFloat() / numRatings.toFloat());
  };
};
