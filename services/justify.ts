export function justify(text: string, len: number): string {
        const re = RegExp("(?:\\s|^)(.{1," + len + "})(?=\\s|$)", "g");
        let res = [];
        let finalResult = [];
        let m;
  
        while ((m = re.exec(text)) !== null) {
            res.push(m[1]);
        }
  
        for (let i = 0; i < res.length - 1; i++){    
            if(res[i].indexOf(' ') != -1){  
                while(res[i].length < len){      
                    for(let j=0; j < res[i].length-1; j++){
                        if(res[i][j] == ' '){
                            res[i] = res[i].substring(0, j) + " " + res[i].substring(j);
                            if(res[i].length == len) break;
                            while(res[i][j] == ' ') j++;
                        }
                    }
                }      
            }    
            finalResult.push(res[i]);    
        }
  
        finalResult.push(res[res.length - 1]);
  
        return finalResult.join('\n');
}
