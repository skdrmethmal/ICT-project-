import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export const ReviewModel = ({ isOpen, onClose, hotelId, onSubmitReview }) => {
  const [selectedRating, setSelectedRating] = useState(1);

  const reviewSchema = z.object({
    hotelId: z.string(),
    rating: z.number().min(1, "Rating must be at least 1"),
    review: z.string().min(4, "Review must be at least 4 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      hotelId,
      rating: 1,
      review: "",
    },
  });

  const handleStarClick = (value) => {
    setSelectedRating(value);
    form.setValue("rating", value);
  };

  const handleFormSubmit = (data) => {
    onSubmitReview(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Leave a Review (people only who had booked the hotel will be able to
          give the review)
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-1 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-8 w-8 cursor-pointer ${
                            i < selectedRating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                          onClick={() => handleStarClick(i + 1)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write your Review here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={!form.formState.isValid}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
