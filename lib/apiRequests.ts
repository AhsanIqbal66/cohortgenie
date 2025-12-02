import axios, { AxiosResponse, AxiosError } from "axios";
import { parseCookies } from "nookies";
import {
  ApiResponseType,
  AuthRequestParams,
  ErrorData,
  SessionData,
} from "./utils/models/auth.model";
const baseURL = process.env.NEXT_PUBLIC_APP_URL;
import { getCookies, removeCookies } from "@/hooks/useAuth";

const axiosClient = axios.create({
  baseURL: `${baseURL}`,
});
export const authRequest = async <T, D = unknown>({
  url,
  method = "GET",
  data,
  headers,
}: AuthRequestParams<D>): Promise<ApiResponseType<T>> => {
  // const session: SessionData | null =
  //   typeof window !== "undefined"
  //     ? (JSON.parse(localStorage.getItem("user") || "{}") as SessionData | null)
  //     : null;
  const token = getCookies("token");
  return new Promise((resolve, reject) => {
    if (token) {
      axiosClient({
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers,
        },
        url,
        data,
      })
        .then((res: AxiosResponse<T>) => {
          resolve(res as any);
        })
        .catch((err: AxiosError<ErrorData>) => {
          reject({
            status: err.response?.status,
            data: err.response?.data,
            statusText: err.response?.statusText,
            headers: err.response?.headers as Record<string, string>,
            config: err.response?.config || {},
          });
        });
    }
  });
};
export const publicRequest = async <T, D = unknown>({
  url,
  method = "GET",
  data,
  headers,
}: AuthRequestParams<D>): Promise<ApiResponseType<T>> => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method,
      headers: {
        ...headers,
      },
      url,
      data,
    })
      .then((res: any) => {
        console.log(res);
        resolve(res as any);
      })
      .catch((err: AxiosError<ErrorData>) => {
        reject({
          ...err?.response,
        });
      });
  });
};
export const handleApiCall = async <T>(
  requestFn: () => Promise<any>
): Promise<{ status: number; data: any } | undefined> => {
  const token = getCookies("token");
  try {
    const { status, data } = await requestFn();
    return { status, data };
  } catch (error: any) {
    console.log("🚀 ~ handleApiCall ~ error:", error.status);
    if (error?.data?.quickbook === false) {
      if (typeof window !== "undefined") {
        try {
          const userString = localStorage.getItem("user");

          if (userString) {
            const existingUserData = JSON.parse(userString);
            const updatedUserData = {
              ...existingUserData,
              connection_flag: false,
            };

            localStorage.setItem("user", JSON.stringify(updatedUserData));
          } else {
            localStorage.setItem(
              "user",
              JSON.stringify({ connection_flag: false })
            );
          }
        } catch (storageError) {
          console.error("Error processing local storage data:", storageError);
        }

        window.location.href = "/integration?step=1";
      }
    }

    if (error.status === 401) {
      localStorage.removeItem("user");
      removeCookies("token");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    throw error;
  }
};
