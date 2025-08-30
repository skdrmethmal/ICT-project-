import React from "react";
import { useGetHelpQuery } from "@/lib/api";
import { HelpCard } from "./HelpCard";
import { toast } from "sonner";
export const HelpAUser = () => {
  const { data: helps, isLoading, isError, error } = useGetHelpQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center  mt-10 mb:10 md:mb-20 ">
        <div className="mt-4 ml-4 w-5/6 md:w-1/2 bg-white rounded-lg p-10 border-1 border-gray-100 shadow-md">
          <h1 className=" text-2xl font-bold mb-10 ">Help A User</h1>
          <div>help requests loading...</div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center  mt-10 mb:10 md:mb-20 ">
        <div className="mt-4 ml-4 w-5/6 md:w-1/2 bg-white rounded-lg p-10 border-1 border-gray-100 shadow-md">
          <h1 className=" text-2xl font-bold mb-10 ">Help A User</h1>
          <div>help requests error...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center  mt-10 mb:10 md:mb-20 ">
      <div className="mt-4 ml-4 w-5/6 md:w-1/2 bg-white rounded-lg p-10 border-1 border-gray-100 shadow-md">
        <h1 className=" text-2xl font-bold mb-10 ">Help A User</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {helps.length > 0 ? (
            helps.map((help) => {
              return <HelpCard key={help._id} help={help} />;
            })
          ) : (
            <div>No help requests found</div>
          )}
        </div>
      </div>
    </div>
  );
};
