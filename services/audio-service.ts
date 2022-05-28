import AWS from 'aws-sdk';
import Base64Binary from 'base64-arraybuffer';

/** Description - Upload audio to AWS S3 Bucket
 *
 * @param image - desired audio to upload
 */
export async function UploadAudio (audio: any){
    let contentType = 'audio/mpeg';
   // console.log('check1')
    const arrayBuffer = Base64Binary.decode(audio.base64);
    let contentDisposition = 'inline:filename="' + audio.name +'"';

    const access = new  AWS.Credentials({
        accessKeyId : 'AKIA4ILRFZJUOZIQUKW5',
        secretAccessKey : '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'
    })
    //console.log('check2')

    const AWSbucket = new AWS.S3({
       credentials:access,
        signatureVersion:'v4',
        region:'us-east-2'
    })

    const params = {
            Bucket: 'pricehunt101',
            Key: audio.name,
            Body: arrayBuffer,
            //ContentDisposition: contentDisposition,
            ContentType: contentType
    }

    const response = AWSbucket.upload(params, (err: any) => {
        if(err)  throw err
        console.log('Success')
    })

    return response
}