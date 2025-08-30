import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useReplyToHelpRequestMutation } from "@/lib/api";
import { sub } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const schema = z.object({
  reply: z.string().min(10, "Reply must be at least 10 characters."),
});
export const HelpCard = ({ help }) => {
  const [replyToHelpRequest, { isLoading }] = useReplyToHelpRequestMutation();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      reply: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await replyToHelpRequest({
        to: help.email,
        name: help.name,
        subject: help.subject,
        message: help.message,
        reply: data.reply,
        helpId: help._id,
      }).unwrap();
      toast.success("Help request sent successfully");
      form.reset();
    } catch (error) {
      console.error("Reply error:", error);
      toast.error("Reply failed", {
        description: error?.data?.message || "Unexpected error.",
      });
    }
  };

  return (
    <div className="bg-popover rounded-lg p-6 hover:shadow-lg transition-shadow ">
      <h3 className="text-xl font-medium text-popover-foreground">
        {help.name}
      </h3>

      <p className="text-muted-foreground break-words text-sm ">{help.email}</p>
      <p className="text-black text-sm my-2 ">{help.subject}</p>
      <hr />
      <p className="text-black mt-2 mb-4 text-sm break-words ">
        {help.message}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="reply"
            control={form.control}
            rules={{ required: "Reply is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write your reply..."
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isLoading ? "Sending..." : "Send"}</Button>
        </form>
      </Form>
    </div>
  );
};
