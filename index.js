#!/usr/bin/env node


const fs = require("fs");//importing fs
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondaryArguments = [];


for(let i of arguments){
    if(i[0] == "-"){
        flags.push(i);
    }else if(i[0] == '%'){
        secondaryArguments.push(i.slice(1));
    }else{
        filenames.push(i);
    }
}



for(let file of filenames){
    let fileData = "";
    for(let fl of flags){
        if(fl == "-cr"){
            fs.open(file, 'w', function (err, filee) {
                if (err) throw err;
                console.log("file created!");
              });
            break;  
        }
        fileData = fs.readFileSync(file,"utf-8");
        if(fl == "-rs"){
            fileData = fileData.split(" ").join("");
        }
        if(fl == '-rn'){
            fileData = fileData.split("\r\n").join("");
        }
        if(fl == '-rsc'){
            for(let char of secondaryArguments){
                fileData = removeAll(fileData,char);
            }
        }
        if(fl == '-s'){
            let data = addSequence(fileData);
            fileData = data.toString().split(",").join("\r\n");
        }
        if(fl == '-sn'){
            let data = addSequenceTnel(fileData);
            fileData = data.toString().split(",").join("\r\n");
        }
        if(fl == "-rel"){
            let data = removeExtraLine(fileData);
            fileData = data.toString().split(",").join("\r\n");
        }
        if(fl == "-ral"){
            let data = removeAllLine(fileData);
            fileData = data.toString().split(",").join("\r\n");
        }
        if(fl == "-app"){
            let data = "";
            for(let file of filenames){
                data += fs.readFileSync(file,"utf-8");
                data += "\r\n"
            }
            fs.writeFileSync(filenames[0],data);
        }
        if(fl == "-exc"){
            let data = fs.readFileSync(filenames[1],"utf-8");
            fs.writeFileSync(filenames[0],data);
        }
    }
    console.log(fileData);
}

function removeAll(string, remo) {
    return string.split(remo).join("");
}

function addSequence(string) {
    let content = string.split("\r\n");
    for(let i=0; i<content.length; i++){
        content[i] = (i+1) +"). "+ content[i];
    }
    return content;
}
function addSequenceTnel(string) {
    let content = string.split("\r\n");
    let count =0;
    for(let i=0; i<content.length; i++){
        if(content[i] != "")
         content[i] = ++count +"). "+ content[i];
    }
    return content;
}
function removeExtraLine(data){
    let content  = data.split("\r\n");
    let end = [];
    for(let i=0; i<content.length;i++){
        if(content[i] == "" && content[i+1] == ""){

        }else{
            end.push(content[i]);
        }
    }
    return end;
}
function removeAllLine(data){
    let content  = data.split("\r\n");
    let end = [];
    for(let i=0; i<content.length;i++){
        if(content[i] != ""){
            end.push(content[i]);
        }
    }
    return end;
}
