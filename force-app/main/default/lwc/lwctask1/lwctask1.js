import { LightningElement, wire,track,api } from 'lwc';
import getAllSobjects from '@salesforce/apex/sobjController.getAllSobjects';
import GetAllRecordsOfObj from '@salesforce/apex/sobjController.GetAllRecordsOfObj';
const dropdownvalues=[
                        { label:'2' ,value:'2'},
                       { label:'10' ,value:'10'},
                       {label :'20', value:'20'},
                       { label:'50' ,value:'50'},
                       {label :'100', value:'100'}
]


export default class Lwctask1 extends LightningElement {
    @track data;
    @track value = '';
    @track objectrecs=[];
    @track error;
    @track fieldItems=[]; 
    lstSelected = [];
    @track tableData;
    @track lstOptions=[];
    objsfields;
    @track selectedFieldsValue='';
    @track selectedLimit='';
    @track queryString;
    @track records;
    errorMessage;
    @track dropdownvalues=dropdownvalues; 
    @track finalQuery='';
    @track recordColumns=[];
    sort='';
    @track items=[];
    @wire(getAllSobjects)
    wiredObjects({error,data}){
        if (data) {
            //console.log(JSON.stringify(data));
            data.map(element=>{
                this.objectrecs = [...this.objectrecs ,{value: element.QualifiedApiName, 
                    label: element.MasterLabel}];  
            });
            
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
    get limitdropdown(){
        return this.dropdownvalues; 
    }
    get statusOptions() {
        return this.objectrecs;
    }
    handleChange(event) {
        const selectedOption = event.detail.value;
        //console.log(selectedOption);
        this.value = selectedOption;
    
          this.template.querySelector('c-lwc-task-one-child').objectfieldsdata(this.value);
          
    }
    HandleSelectedFields(event){
        this.objsfields=event.detail.selectFields;
        this.selectedFieldsValue = '';  
                this.objsfields.map(element=>{
                    if(this.selectedFieldsValue !=='' ){
                        this.selectedFieldsValue = this.selectedFieldsValue +','+ element;
                        //console.log(this.selectedFieldsValue)
                    }

                    else{
                        this.selectedFieldsValue = element;
                        //console.log(this.selectedFieldsValue)
                    }
                });
                //this.finalQuery='SELECT'+ ' ' + this.selectedFieldsValue + ' ' + 'FROM' +' '+ this.value;
                if(this.selectedLimit != ''){
                    this.finalQuery='SELECT'+ ' ' + this.selectedFieldsValue + ' ' + 'FROM' +' '+ this.value + ' ' + 'LIMIT' + ' ' + this.selectedLimit;
                }else{
                    this.finalQuery='SELECT'+ ' ' + this.selectedFieldsValue + ' ' + 'FROM' +' '+ this.value;
                }

                if(this.sort != ''){
                    this.finalQuery='SELECT'+ ' ' + this.selectedFieldsValue + ' ' + 'FROM' +' '+ this.value + ' ' +'ORDER BY'+' '+'Name'+' '+ this.sort +' '+ 'LIMIT' + ' ' + this.selectedLimit;
                }else{
                    this.finalQuery='SELECT'+ ' ' + this.selectedFieldsValue + ' ' + 'FROM' +' '+ this.value;
                }
                
                
    }
    resetTextArea(){
        this.selectedFieldsValue = ''; 
    }
    HandleLimit(event){
        this.selectedLimit=event.target.value;
        //console.log(this.selectedLimit);
        if(this.selectedLimit!= ''){
            this.finalQuery='SELECT'+ ' ' + this.selectedFieldsValue + ' ' + 'FROM' +' '+ this.value + ' ' +'ORDER BY'+' '+'Name'+' '+ this.sort +' '+ 'LIMIT' + ' ' + this.selectedLimit;
        }
        
        //this.HandleSelectedFields();
    }
   /* HandleQuery(){        
        const valueParam = this.value;
        const selectedFieldsValueparams = this.selectedFieldsValue;
        const maxlimit = this.selectedLimit;
        const sorting=this.sort;
        let columnFields = selectedFieldsValueparams.split(',');
        this.items='';

        
        columnFields.map(element=>{
            //console.log('colmns'+JSON.stringify(columnFields));
            //let itemValue = element.charAt(0).toUpperCase()+ element.slice(1);
            //console.log('colmns'+JSON.stringify(columnFields[element]));
            this.items = [...this.items ,{label:element, 
                                        fieldName:element}];    
        });
        
        this.recordColumns = this.items;  
        console.log(JSON.stringify(this.recordColumns));
        GetAllRecordsOfObj({fields:selectedFieldsValueparams,objapiName:valueParam ,maxlimit:maxlimit,sorting:sorting})
        .then(result => {    
            if (result) {    
                //console.log(JSON.stringify(result)); 
                //console.log(JSON.stringify(result));
                //console.log(JSON.stringify(this.records));
                
                let listrecords = result;
                console.log(JSON.stringify(listrecords));
                   let listofrecords = [];
                   let colsofrecords=this.recordColumns;           
                    
                    
                    //console.log('labellllll======>'+colsofrecords[i]);
                        for (var j = 0;j< listrecords.length;j++) {
                            listofrecords.push(
                                listrecords[j]
                            );
                            //console.log(JSON.stringify(listofrecords));
                        }
                   console.log('listofrecords===>'+JSON.stringify(listofrecords));
                   this.records = result;
            } else if (error) {
                this.error = error;
            }         
        })
        .catch((error)=>{
            this.errorMessage=error;
            alert(error);
            console.log('unable to find  the records due to'+JSON.stringify(this.errorMessage));
        });
        
        
        
        
    }*/
    HandleQuery1(){
        const valueParam = this.value;
        const selectedFieldsValueparams = this.selectedFieldsValue;
        //console.log(selectedFieldsValueparams);
        const maxlimit = this.selectedLimit;
        const sorting=this.sort;
        let columnFields = selectedFieldsValueparams.split(',');
        //console.log('columnFields'+columnFields);
        this.items=''; 
        columnFields.map(element=>{
            this.items = [...this.items ,{label:element, 
                                        fieldName:element}];    
        });
        this.recordColumns = this.items;
        //console.log(JSON.stringify(this.recordColumns));
        GetAllRecordsOfObj({fields:selectedFieldsValueparams,objapiName:valueParam ,maxlimit:maxlimit,sorting:sorting})
        .then(result => { 
            document.getElementById("sfdctable").innerHTML='';
            //console.log(JSON.stringify(result));
                var objectRecords=result;
                //console.log(JSON.stringify(result));
                var fieldlist=this.recordColumns;
                let columnsfields=[];
                for(let i=0;i<fieldlist.length;i++){
                    columnsfields.push(fieldlist[i].label);
                }
                //let colcount=columnsfields.length;
                console.log(columnFields.length);
                var v =document.createElement('TABLE');
                //v.setAttribute("id", "myTable");
                //document.getElementById('sfdctable').appendChild(v);
                var row =v.insertRow(-1);
                for (var i = 0; i < columnsfields.length; i++) {
                    console.log(columnsfields[i]);
                    var headerCell = document.createElement("TH");
                    headerCell.innerHTML = columnsfields[i];
                    console.log(headerCell);
                    headerCell.className='hearderClass';
                    console.log(headerCell);
                    row.appendChild(headerCell);
                    //console.log(row);
                }
                var dvTable = document.getElementById("sfdctable");
                dvTable.innerHTML = "";
                dvTable.appendChild(v);
                if(objectRecords.length){
                    for(var j=0; j < objectRecords.length; j++){
                        // Dynamic table Row
                        row = table.insertRow(-1);
                        // Dynamic Table Row End
                        for (var i=0; i <  columnsfields.length; i++) {
                            // Dynamic table Row
                            var cell = row.insertCell(-1);
                            cell.innerHTML = objectRecords[j][columnsfields[i].label];
                            
                        }
                    }
                }
                
              

                
        })
        .catch((error)=>{
            this.errorMessage=error;
            alert(error);
            console.log('unable to find  the records due to'+JSON.stringify(this.errorMessage));
        });
        

    }
    handlesort(event){
        const sortas=event.target.value;
        if(sortas==='Ascending'){
            this.sort='ASC';
            //console.log(this.sort);
        }else if(sortas==='Descending'){
            this.sort='DESC';
           // console.log(this.sort);
        }
        if(this.sort != ''){
            this.finalQuery='SELECT'+ ' ' + this.selectedFieldsValue + ' ' + 'FROM' +' '+ this.value + ' ' +'ORDER BY'+' '+'Name'+' '+ this.sort +' '+ 'LIMIT' + ' ' + this.selectedLimit;
        }
        
    }
    
}