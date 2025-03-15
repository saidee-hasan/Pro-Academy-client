import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append('image', image[0]);

  const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APYKEY}`, formData);

  return data.data.display_url;
}
