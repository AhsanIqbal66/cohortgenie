"use client";
import Image from "next/image";
import errorImage from "../../public/images/403.jpg";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";

const Error403 = () => {
  const router = useRouter();
  return (
    <Card className="min-h-[85vh] border-0 flex flex-col items-center justify-center p-6 bg-white text-primary-text text-center">
      <CardContent>
        <Image
          src={errorImage}
          alt="Illustration of a server outage or maintenance icon"
          width={500}
          height={500}
          className="w-full h-auto object-contain mx-auto max-w-[800px] mb-4"
          priority
        />

        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-xl font-medium text-secondary-text mb-6">
            🚨 System Error! We're running into a temporary issue.
          </h1>

          <p className="text-lg text-primary-text mb-8">
            It looks like there's a problem communicating with our server.
            Please try again in a few moments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => router.push("/dashboard/home")}
              variant={"main"}
            >
              Go to Home
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant={"outline"}
            >
              Try Again
            </Button>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            If this error persists, please contact our support team.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Error403;
