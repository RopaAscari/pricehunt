export interface Item {
    id?: string
    type?:string
    name?: string
    price?:string
    tags:Array<any>
    comments?: string
    imageUrl?: string
    merchantId?:string
    description?: string
    merchantName?:string
    popularLabel?: string
    images?: Array<string>
    containerType?: number
    thumbnailImage?: string 
}

 interface HunterChatType {
    id: string
    name: string
    photo: string
    online: boolean
 }

 interface MerchantType  {
    id: string
    name: string
    photo: string 
    online: boolean
}

interface LatestMessage {
    text: string
    createdAt: string
}

export interface ChatType {
    chatId: string,
    hunter: HunterChatType,
    merchant: MerchantType,
    latestMessage: LatestMessage
    reply?: any
}

export interface CoordinateType {
    latitude: number;
    longitude: number;
  }

export interface User {
    _id?:string,
    chats?: Array<ChatType>
    email?: string,
    lastName?:string,
    username?: string,
    firstName?:string,  
    profilePic?:string,
    password?:string,
    isloggenIn?:boolean,
    favouriteItems?:Array<number>, 
}

export interface Merchant {
    firstName : string,
    lastName : string,
    username :string,
    password : string,
    companyName : string,
    profilePic : string,
    location : CoordinateType,            
    email : string,
    category : string,
    logo: string
}

export const CREATE_ACCOUNT_ACTION = 'Create';
export const SIGNIN_ACCOUNT_ACTION = 'SignIn';
export const HUNTER_ACCOUNT_TYPE = 'Hunter';
export const MERCHANT_ACCOUNT_TYPE = 'Merchant';
