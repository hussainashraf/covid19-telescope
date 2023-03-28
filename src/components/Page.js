import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import dateFormat, { masks } from "dateformat";


function Page() {
  const { user, isAuthenticated, isLoading } = useAuth0();
//   console.log(user.updated_at);
//   console.log(date.toDateString())
  return (
      
    isAuthenticated && (
      <div>
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              User Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {user.nickname}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {user.email}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Account Creation Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {dateFormat(user.updated_at, "dddd, mmmm dS, yyyy, h:MM:ss TT")};
            
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    )
  );
}

export default Page;
