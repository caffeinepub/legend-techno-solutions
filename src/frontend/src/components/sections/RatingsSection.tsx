import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Loader2 } from 'lucide-react';
import { useGetRecentRatings, useGetAverageRating, useSubmitRating } from '@/hooks/useQueries';

export default function RatingsSection() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const { data: recentRatings, isLoading: ratingsLoading } = useGetRecentRatings(10);
  const { data: averageRating } = useGetAverageRating();
  const submitRatingMutation = useSubmitRating();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating < 1 || rating > 5) {
      setError('Please select a rating between 1 and 5 stars');
      return;
    }

    try {
      await submitRatingMutation.mutateAsync({
        rating,
        comment: comment.trim() || null,
      });
      
      // Reset form
      setRating(0);
      setComment('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit rating. Please try again.');
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <section id="ratings" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Rate Our Service
            </h2>
            <p className="text-lg text-muted-foreground">
              Your feedback helps us improve and serve you better
            </p>
            {averageRating !== null && averageRating !== undefined && (
              <div className="flex items-center justify-center gap-2 text-lg">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averageRating)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-foreground">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  ({recentRatings?.length || 0} {recentRatings?.length === 1 ? 'rating' : 'ratings'})
                </span>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Rating Form */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Rating</CardTitle>
                <CardDescription>
                  Share your experience with Legend Techno Solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Your Rating *</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= displayRating
                                ? 'fill-primary text-primary'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <p className="text-sm text-muted-foreground">
                        You selected {rating} {rating === 1 ? 'star' : 'stars'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">Comment (Optional)</Label>
                    <Textarea
                      id="comment"
                      placeholder="Tell us about your experience..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {comment.length}/500
                    </p>
                  </div>

                  {error && (
                    <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitRatingMutation.isPending || rating === 0}
                  >
                    {submitRatingMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Rating'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recent Ratings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>
                  What our customers are saying
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ratingsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : !recentRatings || recentRatings.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No ratings yet. Be the first to rate us!
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {recentRatings.map((ratingItem) => {
                      const date = new Date(Number(ratingItem.timestamp) / 1000000);
                      return (
                        <div
                          key={ratingItem.id.toString()}
                          className="border-b border-border pb-4 last:border-0"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= Number(ratingItem.rating)
                                      ? 'fill-primary text-primary'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {date.toLocaleDateString()}
                            </span>
                          </div>
                          {ratingItem.comment && (
                            <p className="text-sm text-foreground">
                              {ratingItem.comment}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
