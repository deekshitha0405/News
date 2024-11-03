import { title } from "process";
import { GuardianApiProps, NYTimesProps } from "../components/type";

export const getFormattedNyData = (data:any) => {
  return data?.map((el:NYTimesProps) => {
    return {
      title: el?.headline?.main,
      description: el?.lead_paragraph + " " + el?.snippet,
      url: el?.web_url,
      publishedAt: el?.pub_date,
    };
  });
};

export const getFormattedGuardianApiData = (data: any) => {
    return data?.map((el:GuardianApiProps) => {
      return {
        title: el?.webTitle,
        description: el?.webTitle,
        url: el?.webUrl,
        publishedAt: el?.webPublicationDate,
      };
    });
  };

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
