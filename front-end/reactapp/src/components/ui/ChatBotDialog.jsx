import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "./form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useChatBotMutation } from "@/lib/api";
import { SendHorizonal } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const schema = z.object({
  message: z.string().min(1),
});

export const ChatBotDialog = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! How can I assist you today? For example, you can ask: 'I'm planning a weekend picnic with my family. what would you suggest a hotel or villa?",
    },
  ]);
  const [botChat, { isLoading }] = useChatBotMutation();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      message: "",
    },
  });
  const onSend = async (data) => {
    const newMessages = [...messages, { role: "user", content: data.message }];
    setMessages(newMessages);
    form.reset();

    try {
      const res = await botChat({ messages: newMessages }).unwrap();
      setMessages(res.messages);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "OOps, something went wrong." },
      ]);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="fixed bottom-6 right-6  rounded-full w-18 h-18 shadow-md p-4 bg-white text-white hover:h-20 hover:w-20  transition">
            <img
              src="/assets/bot_icon.webp"
              alt="Avatar"
              className=" rounded-full"
            />
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-md w-full border-none shadow-xl p-0 bg-white rounded-xl overflow-hidden">
          <DialogTitle>
            <div className="bg-white shadow-md  px-4 py-3 flex items-center gap-3">
              <LazyLoadImage
                src="/assets/bot_icon.webp"
                alt="Avatar"
                className="w-10 h-10 rounded-full border-1 border-gray-200"
              />
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">
                  <span>Hotelzi</span>
                  <span className="animate-pulse text-blue-800">AI</span>
                </h3>
                <p className="text-xs  text-muted-foreground">
                  Your perfect staycation, simplified.
                </p>
              </div>
            </div>
          </DialogTitle>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto space-y-3 p-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 text-sm rounded-xl max-w-[75%] shadow-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-zinc-900 text-white"
                    : "mr-auto bg-white border border-gray-200 text-gray-900"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="border-t border-gray-200 px-4 py-3 bg-white">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSend)}
                className="flex gap-2 items-center"
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Type your message..."
                          className="bg-gray-100 border-none focus:ring-2 focus:ring-blue-500 rounded-full px-4"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-full px-2 py-2 text-white bg-zinc-900 hover:bg-zinc-800"
                >
                  <SendHorizonal className="w-5 h-5" />
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
