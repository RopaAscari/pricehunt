import axios, { AxiosRequestConfig} from 'axios';

interface User {
  _id:string,
  email: string,
  lastName:string,
  username: string,
  firstName:string,  
  profilePic:string, 
  isloggenIn: boolean,
  favouriteItems:Array<number>
}

interface Item {
  id?:number
  name?: string,
  price?:number,
  merchant?:string,
  comments?: string, 
  imageUrl?: string,
  description?: string,
  popularLabel?: string,
  containerType?: number,
  images?: Array<string>,
}

interface SelectedImage {
    uri: string,
    name: string, 
    type: string,
    base64: string
}


interface Comment {
  
}

let networkRetry = 0;
const userURL = 'http://10.0.2.2:8080';
const merchantURL = 'http://10.0.2.2:8087';
const itemURL = 'http://10.0.2.2:8082';
const cartURL = 'http://10.0.2.2:8083';
const commentURL = 'http://10.0.2.2:8084';
const storeURL = 'http://10.0.2.2:8085';
const messageURL = 'http://10.0.2.2:8086';

//axiosRetry(axios, { retryDelay: (retryCount) => {
 //   console.log("Retrying ", networkRetry ++ ,"......")
 ////   return retryCount * 500;
//}});
  
let config = (token: string) => {
    let configuration: AxiosRequestConfig = {
      headers: {
      'Authorization':`Bearer ${token}`
    }
  }
  return configuration
}

// All api calls within the application
class ApiService {

    GetUser = async (id: number) => {
        return await axios.get(userURL + '/user/'+ id);
    } 

    GetAllMerchants =  async () => {
        return await axios.get(merchantURL + '/merchant/all')
    }
    
    GetOneItem = async (itemId: number) => { 
        return await axios.get(itemURL + '/item/'+ itemId);
    }
    GetAllItems = async () => { 
        return await axios.get(itemURL + '/item/all');
    }

    GetItem = async (name: string) => { 
        return await axios.get(itemURL + '/item/name/'+ name);
    } 

    RemoveItem = async (itemId: number, token: any) => { 
        return await axios.delete(itemURL + '/item/'+ itemId, config(token)); 
    }

    SignUpHunter = async (hunter: User) => { 
        return await axios.post(userURL + '/user/add', hunter); 
    } 

    LoginHunter = async (hunter: User) => { 
      return await axios.post(userURL + '/user/login', hunter); 
    } 

    GetAllComments = async (itemId: number) => { 
        return await axios.get(commentURL + '/comment/item/'+ itemId);
    }  
  
    AddComment = async (comment: Comment) => { 
        return await axios.post(commentURL + '/comment/add/', comment); 
    } 
  
    SignUpMerchant = async (merchant: User) => { 
        return await axios.post(merchantURL + '/merchant/add', merchant);
    } 
      
    LoginMerchant = async (merchant: User) => { 
        return await axios.post(merchantURL + '/merchant/login', merchant); 
    }  

    GetMerchantItem = async (merchantId: number) => { 
        return await axios.get(itemURL + '/item/merchant/'+ merchantId); 
    }

    DeleteUser = async(id: number, token: string) => {
        return await axios.delete(userURL + '/user/' + id, config(token));
    }

    GetMerchantStore =  async(id: string) => {
        return await axios.get(storeURL + '/store/merchant/' + id);
    }

    RemoveFavoriteItem = async (itemId: any, favorite: any) => { 
        return await axios.put(userURL + '/user/deleteFavorite/'+ itemId, favorite); 
    }

    AddItem = async (item : Item, token: string) => { 
        return await axios.post(itemURL + '/item/add', item , config(token));
    }

    AddProfilePhoto = async(image: any, id: string) => {
        return await axios.put(userURL + '/user/image/'+ id, image)
    }

    RemoveProfilePhoto = async(id: string) => {
        return await axios.put(userURL + '/user/deletePic/'+ id, id)
    }

    AddFavouriteItem = async (itemId: any, favorite: any) => { 
        return await axios.put(userURL + '/user/addFavorite/'+ itemId, favorite)
    }
}

export default new ApiService();
