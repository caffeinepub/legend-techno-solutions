import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact Inquiry Management
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

  func getNextId() : Nat {
    let id = nextId;
    nextId += 1;
    id;
  };

  public shared ({ caller }) func createInquiry(name : Text, email : Text, message : Text) : async () {
    // No authorization check - public contact form accessible to everyone including guests
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

  // Data-Driven Site Content Management
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
      heroHeading = "Legend Techno Solutions";
      heroSubheading = "Empowering Your Digital Future";
      servicesHeading = "Our Services";
      servicesDescription = "We offer a range of services including digital transformation consulting, cloud solutions, and IT support.";
      aboutHeading = "About Legend Techno Solutions";
      aboutDescription = "Legend Techno Solutions is dedicated to helping businesses achieve their digital goals with innovative and reliable technology solutions.";
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
    siteContent;
  };

  public shared ({ caller }) func updateSiteContent(newContent : SiteContent) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update site content");
    };
    siteContent := newContent;
  };
};
