declare const window: any;

// Function to set a cookie
export const useSetCookie = (name: string, value: string, days: number) => {
  if (typeof window !== "undefined" && window.document) { // Ensure it's only run in the browser
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    window.document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }
};

// Function to delete a cookie
export const useDeleteCookie = (name: string) => {
  if (typeof window !== "undefined" && window.document) { // Ensure it's only run in the browser
    window.document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

// Function to get a cookie
export const useGetCookie = (name: string) => {
  if (typeof window !== "undefined" && window.document) { // Ensure it's only run in the browser
    const nameEQ = name + "=";
    const cookies = window.document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();

      // Check if the current cookie starts with the name we want
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
  }
  
  return null; // Return null if the cookie was not found
};
