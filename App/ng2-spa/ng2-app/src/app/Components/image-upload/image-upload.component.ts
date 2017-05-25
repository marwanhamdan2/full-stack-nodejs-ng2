import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http'
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  @ViewChild('canvasRef') canvasRef:ElementRef;

  private remoteUploadApiUrl;
  fileData = null;
  fileRef: File = null;
  uploadResponseMessage: string;
  uploadResponseStatus: boolean;


  constructor(
    private Http: Http,
    private ElementRef : ElementRef
  ) {

    let baseUrl = `${environment.remoteProtocol}${environment.remoteServer}:${environment.remotePort}`;
    this.remoteUploadApiUrl = `${baseUrl}/upload/image`;
  }

  ngOnInit() {
      console.log(`item ref`, this.canvasRef);
  }


  onFileChange(event){
    try{
      let fileList: FileList = event.target.files;
      if(fileList && fileList[0]){
        this.fileRef = fileList[0];
        var reader  = new FileReader();

        reader.onload = (evt: any)=>{
          this.fileData = evt.target.result;
          this.renderIntoCanvas()
        }

        reader.readAsDataURL(this.fileRef);
      }
    }catch(exception){
      console.log(`EXCEPTION: `, exception);
    }
  }

  renderIntoCanvas(){
    var image = new Image();
    image.onload = ()=>{
      var imageWidth = image.width, imageHeight = image.height;
      this.canvasRef.nativeElement.width = imageWidth;
      this.canvasRef.nativeElement.height = imageHeight;
      let canvasContext = this.canvasRef.nativeElement.getContext('2d');
      canvasContext.drawImage(image, 0, 0);
    }
    image.src = this.fileData;
  }

  uploadFile(){
    /**
     * recall
     * 
     * content-types:
     *  app/json (json)
     *  www-urlencode-formdata (only text)
     *  multipart/formdata (text & files)
     * 
     * The content type will be multipart as formdata
     * format data allow us to mock the form submission
     * where we can add map (key-values)
     * where values can be text or files
     */
    
    //deinfe headers
    //let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Accept', 'application/json');

    //define body
    let formData:FormData = new FormData();
    console.log(`file ref`, this.fileRef);
    formData.append('upload-image', this.fileRef, this.fileRef.name);


    //let options = new RequestOptions({ headers: headers });
    this.Http.post(this.remoteUploadApiUrl, formData, /*options*/)
    .map((res: Response)=>{
      return (res.json())
    })
    .catch(err=>{
      throw Observable.throw(err);
    })
    .subscribe((data: any)=>{
      this.uploadResponseStatus = true;
      this.uploadResponseMessage = data;
      this.displayFacesRectangles(data.coordinates);
    }, err=>{
      this.uploadResponseStatus = false;
      this.uploadResponseMessage = err;
    });
  }


  displayFacesRectangles(coordinates){
    let canvasContext = this.canvasRef.nativeElement.getContext('2d');
    coordinates.forEach((coord)=>{
      canvasContext.beginPath();
      canvasContext.lineWidth="2";
      canvasContext.strokeStyle="red";
      canvasContext.rect(coord.x, coord.y, coord.width, coord.height); 
      canvasContext.stroke();
    });
  }

}
