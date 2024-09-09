import { GET_ALL_CHAT_GROUP_URL } from "@/lib/apiEndPoint";

export async function fetchChatGroups(token: string) {
    const res = await fetch(GET_ALL_CHAT_GROUP_URL, {
        headers: {
            authorization: token
        },
        next:{
            revalidate: 60*60,
            tags: ["dashboard"]
        }
    })

    const response = await res.json();

    if(!res.ok){
        console.log(res);
        return Error("Failed to fetch data!");
    }

    if(response.data){
        return response.data;
    }

    return [];

}