import axios from "axios";

const fetcher = (url: string) =>
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL || ""}${url}`).then((res) => res.data);

export default fetcher;
