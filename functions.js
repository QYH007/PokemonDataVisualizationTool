
function recreate_list(T,G,L){
    //console.log("jin lai han shu la ")
    //console.log("这次传进来的是"+T+G+L)
    d3.dsv(",", "pokemon.csv", function(csvdata){ 
        //console.log(csvdata);

        // read features row by row, saved in array
        // <entity class="tile m-0 level" style="border: 1px solid rgb(137, 137, 137);">
        //         <div class="tile__icon">
        //           <img src="pic/sprites/007.png" width="50px" height="50px"></img>
        //         </div>
        //         <div class="tile__container">
        //           <p class="tile__title m-0">Squirtle</p>
        //         </div>
        // </entity>

        // creat list
        var rows = d3.select("body").select("#main").select("#topleft").select("#grid_topleft").select("#grid_select_list").select("#list_container").select("#row_container").select("#rows");
        //console.log(rows)
        // get feature of each entity
        var ID = csvdata.Number;
        var img_Path = "pic/sprites/"+csvdata.Number+".png";
        var Pk_Name = csvdata.Name;
        var type1 = csvdata.Type_1;
        var type2 = csvdata.Type_2;
        var generation = csvdata.Generation;
        var isLegendary = csvdata.isLegendary;
        if(L == "isLegendary"){L = "TRUE"};
        if(L == "isnotLegendary"){L = "FALSE"};
        //console.log("这只是"+Pk_Name+"他的属性为"+type1+type2+"他的世代为"+generation+"他的传奇为"+isLegendary);
        //console.log("用户选择的是"+T+G+L);
        // console.log("第一层判断结果"+(type1==T || type2==T || T=="All"))
        // console.log("第二层判断结果"+(generation==G || G=="All"))
        // console.log("第三层判断结果"+(isLegendary==L || L=="All"))
        //console.log("他的判断情况为"+((type1==T || type2==T || T=="All") && (generation==G || G=="All") && (isLegendary==L || L=="All")))
            //Type1s.push(csvdata.Type_1); 
            // Type2s.push(csvdata.Type_2); 
            // Totals.push(csvdata.Total); 
            // HPs.push(csvdata.HP);
            // Attacks.push(csvdata.Attack);
            // Defenses.push(csvdata.Defense);
            // Sp_Atks.push(csvdata.Sp_Atk);
            // Sp_Defs.push(csvdata.Sp_Def);
            // Speeds.push(csvdata.Speed);
            // Generations.push(csvdata.Generation);
            // isLegendarys.push(csvdata.isLegendary); 
            // console.log(csvdata.Number)
            // console.log(csvdata.Name)
            // console.log(csvdata.Total)
        var entities = rows.select("entity");
        entities.remove();
        //console.log(entities)
        if(((type1==T || type2==T || T=="All") && (generation==G || G=="All") && (isLegendary==L || L=="All"))){
            
            var entity = rows.enter().append("entity");
            entity.attr("class","tile m-0 level");
            entity.attr("class","tile m-0 level");
            entity.attr("style","border: 1px solid rgb(137, 137, 137);");
            //console.log("给"+Pk_Name+"加了entity")
            
            tile_icon = entity.insert("Eicon");
            tile_icon.attr("class","tile__icon");
            tile_icon.append("img").attr("src",img_Path).attr("width","50px").attr("height","50px");
            //console.log("给"+Pk_Name+"图标")
    
            tile_container = entity.append("Ename");
            tile_container.attr("class","tile__container");
            tile_container.append("p").attr("class","tile__title m-0").text(Pk_Name)
            //console.log("给"+Pk_Name+"名字")
        }
        });
}

function Show_featue(){
    var Type_1 = this.getAttribute("Type_1");
    var Type_2 = this.getAttribute("Type_2");
    var Name = this.getAttribute("Name");
    var Generation = this.getAttribute("Generation");
    var Number = this.getAttribute("Number");
    var Total = this.getAttribute("Total");
    var HP = this.getAttribute("HP");
    var Speed = this.getAttribute("Speed");
    var Attack = this.getAttribute("Attack");
    var Defense = this.getAttribute("Defense");
    var Sp_Atk = this.getAttribute("Sp_Atk");
    var Sp_Def = this.getAttribute("Sp_Def");
    var isLegendary = this.getAttribute("isLegendary");

    document.getElementById("selected_Type_1").innerHTML = Type_1;
    document.getElementById("selected_Type_2").innerHTML = Type_2;
    document.getElementById("selected_Name").innerHTML = Name;
    document.getElementById("selected_Generation").innerHTML = Generation;
    document.getElementById("selected_Total").innerHTML = Total;
    document.getElementById("selected_HP").innerHTML = HP;
    document.getElementById("selected_Speed").innerHTML = Speed;
    document.getElementById("selected_Attack").innerHTML = Attack;
    document.getElementById("selected_Defense").innerHTML = Defense;
    document.getElementById("selected_Sp_Atk").innerHTML = Sp_Atk;
    document.getElementById("selected_Sp_Def").innerHTML = Sp_Def;
    document.getElementById("selected_isLegendary").innerHTML = isLegendary;
    newpath = "pic/hires/"+Number+".png";
    console.log(newpath)
    document.getElementById("selected_icon").setAttribute("src",newpath);
 
    

    var grid_species_strength = document.getElementById("grid_species_strength");
    grid_species_strength.innerHTML = Type_1;

}

function Recreate_list(T,G,L){
    console.log("jin lai han shu la ")
    var rows = document.getElementById("rows");
    var entities = rows.getElementsByTagName("entity");
    console.log(entities);
    for (const element of entities){
        Type_1 = element.getAttribute("Type_1");
        Type_2 = element.getAttribute("Type_2");
        Generation = element.getAttribute("Generation");
        isLegendary = element.getAttribute("isLegendary");
        if(L == "isLegendary"){L = "TRUE"};
        if(L == "isnotLegendary"){L = "FALSE"};

        if((Type_1==T || Type_2==T || T=="All") && (Generation==G || G=="All") && (isLegendary==L || L=="All")){
            element.setAttribute("style","border: 1px solid rgb(137, 137, 137);")
        }
        else{
            element.setAttribute("style","border: 1px solid rgb(137, 137, 137);display:none;")
        }
    }
    //console.log("这次传进来的是"+T+G+L)
    // var rows = d3.select("body").select("#main").select("#topleft").select("#grid_topleft").select("#grid_select_list").select("#list_container").select("#row_container").select("#rows");
    // var entities = rows.selectAll("entity");
    // console.log(entities.node().property("Type_1"));
    // entities.each((d,i)=>{
    //     console.log(d.size());
    //     console.log(d.property("Type_1"));
    // })
    // for (const element of entities) {
    //     console.log(typeof(element));
    //     console.log(element[0].property("Type_1"));
        
    //   }

    // d3.dsv(",", "pokemon.csv", function(csvdata){ 
    //     //console.log(csvdata);

    //     // read features row by row, saved in array
    //     // <entity class="tile m-0 level" style="border: 1px solid rgb(137, 137, 137);">
    //     //         <div class="tile__icon">
    //     //           <img src="pic/sprites/007.png" width="50px" height="50px"></img>
    //     //         </div>
    //     //         <div class="tile__container">
    //     //           <p class="tile__title m-0">Squirtle</p>
    //     //         </div>
    //     // </entity>

    //     // creat list
    //     var rows = d3.select("body").select("#main").select("#topleft").select("#grid_topleft").select("#grid_select_list").select("#list_container").select("#row_container").select("#rows");
    //     //console.log(rows)
    //     // get feature of each entity
    //     var ID = csvdata.Number;
    //     var img_Path = "pic/sprites/"+csvdata.Number+".png";
    //     var Pk_Name = csvdata.Name;
    //     var type1 = csvdata.Type_1;
    //     var type2 = csvdata.Type_2;
    //     var generation = csvdata.Generation;
    //     var isLegendary = csvdata.isLegendary;
    //     if(L == "isLegendary"){L = "TRUE"};
    //     if(L == "isnotLegendary"){L = "FALSE"};
    //     //console.log("这只是"+Pk_Name+"他的属性为"+type1+type2+"他的世代为"+generation+"他的传奇为"+isLegendary);
    //     //console.log("用户选择的是"+T+G+L);
    //     // console.log("第一层判断结果"+(type1==T || type2==T || T=="All"))
    //     // console.log("第二层判断结果"+(generation==G || G=="All"))
    //     // console.log("第三层判断结果"+(isLegendary==L || L=="All"))
    //     //console.log("他的判断情况为"+((type1==T || type2==T || T=="All") && (generation==G || G=="All") && (isLegendary==L || L=="All")))
    //         //Type1s.push(csvdata.Type_1); 
    //         // Type2s.push(csvdata.Type_2); 
    //         // Totals.push(csvdata.Total); 
    //         // HPs.push(csvdata.HP);
    //         // Attacks.push(csvdata.Attack);
    //         // Defenses.push(csvdata.Defense);
    //         // Sp_Atks.push(csvdata.Sp_Atk);
    //         // Sp_Defs.push(csvdata.Sp_Def);
    //         // Speeds.push(csvdata.Speed);
    //         // Generations.push(csvdata.Generation);
    //         // isLegendarys.push(csvdata.isLegendary); 
    //         // console.log(csvdata.Number)
    //         // console.log(csvdata.Name)
    //         // console.log(csvdata.Total)
    //     var entities = rows.select("entity");
    //     entities.remove();
    //     //console.log(entities)
    //     if(((type1==T || type2==T || T=="All") && (generation==G || G=="All") && (isLegendary==L || L=="All"))){
            
    //         var entity = rows.enter().append("entity");
    //         entity.attr("class","tile m-0 level");
    //         entity.attr("class","tile m-0 level");
    //         entity.attr("style","border: 1px solid rgb(137, 137, 137);");
    //         //console.log("给"+Pk_Name+"加了entity")
            
    //         tile_icon = entity.insert("Eicon");
    //         tile_icon.attr("class","tile__icon");
    //         tile_icon.append("img").attr("src",img_Path).attr("width","50px").attr("height","50px");
    //         //console.log("给"+Pk_Name+"图标")
    
    //         tile_container = entity.append("Ename");
    //         tile_container.attr("class","tile__container");
    //         tile_container.append("p").attr("class","tile__title m-0").text(Pk_Name)
    //         //console.log("给"+Pk_Name+"名字")
    //     }
    //     });
}