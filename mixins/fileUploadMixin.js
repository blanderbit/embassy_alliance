//import axios from 'axios';
const STATUS_INITIAL = 0, 
      STATUS_SAVING = 1, 
      STATUS_SUCCESS = 2, 
      STATUS_FAILED = 3;

export default {
    data() {
        return {
            modals:{
                upload: false,
                uploadStuff: false,
                //pay4TheOrder: false,
                editProfile: false,
                editParent: false,
                createInvoice: false,
                showImage: false,
                showImageSrc: null
            },
            form:{
                sending: false,
                isInitial: true,
                avatar: 'avatar'
            },
            currentStatus: null,
            uploadedFiles: [],
            uploadError: null,
            uploadFieldName: 'photos'
        }
    },
    methods: {
        uploadAvatarForm(id){
            this.workingID = id;
            this.modals.upload = true;
        },
        uploadStuff(id, type){
            this.workingID = id;
            this.modals.uploadStuff = true;
            this.uploadFieldName = type
        },
        async upload(formData, endpoint){
            let url = '';
            switch(endpoint){
                case "avatar":
                url = '/order/upload/avatar/' + this.workingID
                break;
                default:
                url = '/order/upload/documents/' + this.workingID
                break;
            }
            await this.$axios.post(url, 
                formData)
            .then((response) => {
                // $store.state.imgURL + order.participant.avatar
                // switch(endpoint){
                //     case "avatar":
    
                //     break;
                // }
                this.fetchOrders();
                this.modals.upload = false;
                this.modals.uploadStuff = false;
            })
            .catch(err => {
            })
        },
        save(formData,endpoint) {
            // upload data to the server
            this.currentStatus = STATUS_SAVING;
    
            this.upload(formData,endpoint)
              .then(x => {
                this.uploadedFiles = [].concat(x);
                this.currentStatus = STATUS_SUCCESS;
                this.reset()
              })
              .catch(err => {
                this.uploadError = err.response;
                this.currentStatus = STATUS_FAILED;
            });
        },
        filesChange(fieldName, fileList, endpoint) {
            // handle file changes
            const formData = new FormData();
            if (!fileList.length) return;
            // append the files to FormData
            Array
              .from(Array(fileList.length).keys())
              .map(x => {
                formData.append(fieldName, fileList[x], fileList[x].name);
              });
            // save it
            this.save(formData, endpoint);
        },
        uploadAvatarForm(id){
            this.workingID = id;
            this.modals.upload = true;
        },
        uploadStuff(id, type){
            this.workingID = id;
            this.modals.uploadStuff = true;
            this.uploadFieldName = type
        },
        reset() {
            // reset form to initial state
            this.currentStatus = STATUS_INITIAL;
            this.uploadedFiles = [];
            this.uploadError = null;
          },
    },
    computed: {
        isInitial() {
          return this.currentStatus === STATUS_INITIAL;
        },
        isSaving() {
          return this.currentStatus === STATUS_SAVING;
        },
        isSuccess() {
          return this.currentStatus === STATUS_SUCCESS;
        },
        isFailed() {
          return this.currentStatus === STATUS_FAILED;
        }
      },
      mounted(){
        this.reset();
    }
    
}