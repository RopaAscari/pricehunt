//import S3 from 'aws-sdk/clients/s3'
import AWS from 'aws-sdk';
import Base64Binary from 'base64-arraybuffer';
//const accessKey = process.env.accessKeyId;
//const secretAccess = process.env.secretAccessKey;

/** Description - Upload images to AWS S3 Bucket
 *
 * @param image - desired image to upload
 */
 export async function UploadImages (image){

    let contentType = 'image/jpeg';
    const arrayBuffer = Base64Binary.decode(image.base64);
   
    let contentDisposition = 'inline:filename="' + image.name +'"';

    const access = new  AWS.Credentials({
        accessKeyId : 'AKIA4ILRFZJUOZIQUKW5',
        secretAccessKey : '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'
    })

    const AWSbucket = new AWS.S3({
       credentials:access,
        signatureVersion:'v4',
        region:'us-east-2'
    })

    const params = {
            Bucket: 'pricehunt101',
            Key: image.name,
            Body: arrayBuffer,
            ContentDisposition: contentDisposition,
            ContentType: contentType
    }

    console.log('Image',arrayBuffer)

    const response = AWSbucket.upload(params, (err) => {
        console.log(params.Body)
        if(err)  throw err
        console.log('Success')
    })

    return response
}