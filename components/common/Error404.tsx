"use client";
import Image from "next/image";
import errorImage from "../../public/images/404-2.png";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";

const Error404 = () => {
  const router = useRouter();
  return (
    <Card className="min-h-[85vh] border-0 flex flex-col items-center justify-center p-6 bg-white text-primary-text text-center">
      <CardContent>
        <Image
          src={errorImage}
          alt="Illustration of a broken link or search error"
          width={500}
          height={500}
          className="w-full h-auto object-contain mx-auto max-w-[500px] mb-8"
          priority
        />
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-xl font-medium text-secondary-text mb-6">
            Oops! It looks like you've followed a broken link or entered a URL
            that doesn't exist here.
          </h1>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => router.push("/dashboard/home")}
              variant={"main"}
            >
              Home
            </Button>
            <Button onClick={() => window.history.back()} variant={"outline"}>
              Go Back
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            If you continue to experience this error, please contact support.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Error404;
