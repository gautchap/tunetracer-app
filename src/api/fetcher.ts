import { z } from "zod";
import { signOut } from "next-auth/react";

interface FetcherConfig<T> {
    data?: unknown;
    zodSchema?: z.ZodSchema<T>;
    method?: "DELETE" | "GET" | "OPTIONS" | "PATCH" | "POST" | "PUT";
    headers?: HeadersInit;
    customConfig?: RequestInit;
}

export async function fetcher<T>(
    url: string,
    { data, zodSchema, method, headers: customHeaders, customConfig }: FetcherConfig<T>
): Promise<T> {
    const config: RequestInit = {
        method: method ?? (data ? "POST" : "GET"),

        body: data ? JSON.stringify(data) : null,
        headers: {
            "Content-Type": data ? "application/json" : "",
            Accept: "application/json",
            ...customHeaders,
        },
        ...customConfig,
    };

    // eslint-disable-next-line github/no-then
    return window.fetch(url, config).then(async (response) => {
        if (response.status === 401) {
            signOut();
            throw new Error("You're not authenticated");
        }

        let result = null;
        try {
            result = response.status === 204 ? null : await response.json();
        } catch (error: unknown) {
            // eslint-disable-next-line unicorn/no-useless-promise-resolve-reject
            return Promise.reject(error);
        }

        if (response.ok) {
            return zodSchema && result ? zodSchema.parse(result) : result;
        } else {
            throw result;
        }
    });
}
