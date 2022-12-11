const Bug_color = "rgba(109, 175, 17, 0.6)";
const Dark_color = "rgba(48, 40, 40, 0.6)";
const Dragon_color = "rgba(50, 17, 213, 0.6)";
const Electric_color = "rgba(255, 221, 0, 0.8)";
const Fairy_color = "rgba(237, 61, 220, 0.6)";
const Fighting_color = "rgba(237, 112, 17, 0.6)";
const Fire_color = "rgba(203, 29, 29, 0.6)";
const Flying_color = "rgba(115, 212, 231, 0.6)";
const Ghost_color = "rgba(113, 11, 118, 0.6)";
const Grass_color = "rgba(21, 198, 47, 0.6)";
const Ground_color = "rgba(188, 83, 12, 0.6)";
const Ice_color = "rgba(111, 212, 210, 0.6)";
const Normal_color = "rgba(134, 130, 119, 0.6)";
const Poison_color = "rgba(148, 22, 198, 0.6)";
const Psychic_color = "rgba(215, 19, 104, 0.6)";
const Rock_color = "rgba(175, 161, 132, 0.6)";
const Steel_color = "rgba(31, 170, 189, 0.6)";
const Water_color = "rgba(57, 109, 228, 0.6)";

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
    // Type 
    type1_class = "tag tag--"+Type_1;
    document.getElementById("selected_Type_1").setAttribute("class",type1_class)
    document.getElementById("selected_Type_1").innerHTML = Type_1;
    if (Type_2==""){
        document.getElementById("selected_Type_2").setAttribute("style","display:none; margin:0 auto;justify-content:center;width: 50px;height: 20px;")
    }
    else{
        type2_class = "tag tag--"+Type_2;
        document.getElementById("selected_Type_2").setAttribute("style","margin:0 auto;justify-content:center;width: 50px;height: 20px;")
        document.getElementById("selected_Type_2").setAttribute("class",type2_class)
        document.getElementById("selected_Type_2").innerHTML = Type_2;
    }
    // legendary
    if(isLegendary == "TRUE"){
        document.getElementById("selected_isLegendary").innerHTML = "YES"
    }
    else{
        document.getElementById("selected_isLegendary").innerHTML = "NO"
    }
    // other
    document.getElementById("selected_Name").innerHTML = Name;
    document.getElementById("selected_Generation").innerHTML = Generation;
    document.getElementById("selected_Total").innerHTML = "Species strength: "+Total;
    document.getElementById("selected_HP").innerHTML = HP;
    document.getElementById("selected_Speed").innerHTML = Speed;
    document.getElementById("selected_Attack").innerHTML = Attack;
    document.getElementById("selected_Defense").innerHTML = Defense;
    document.getElementById("selected_Sp_Atk").innerHTML = Sp_Atk;
    document.getElementById("selected_Sp_Def").innerHTML = Sp_Def;

    newpath = "pic/hires/"+Number+".png";
    //console.log(newpath)
    document.getElementById("selected_icon").setAttribute("src",newpath);
    var data = []
    data.push(parseInt(HP));
    data.push(parseInt(Sp_Atk));
    data.push(parseInt(Sp_Def));
    data.push(parseInt(Speed));
    data.push(parseInt(Defense));
    data.push(parseInt(Attack));
    Draw_radar_2(data,Type_1);

    // Highlight the conterpart line in line chart
    Highlight_line(Type_1,Type_2);

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
}

function Add_to_my_team(){
    // get selected entity features
    var pokemonName = document.getElementById("selected_Name").innerHTML;
    console.log(pokemonName);
    var entity = document.getElementById(pokemonName);
    var Number = entity.getAttribute("Number");
    var imgpath = "pic/sprites/"+Number+".png";

    // Change Icon in the team
    var grid_my_team = document.getElementById("grid_my_team");
    var containers = grid_my_team.getElementsByTagName("img");
    console.log(containers);
    var i = 0;
    for (const element of containers){
        if(element.getAttribute("src") == "pic/plus.png"){
            element.setAttribute("src", imgpath);
            // Record the name of the pokemon
            element.setAttribute("Name", pokemonName);
            element.setAttribute("height", "60px");
            element.setAttribute("width", "60px");
            break;
        }
    }
    Redraw_comparing_chart();
}

function Add_to_rival_team(){
    // get selected entity features
    var pokemonName = document.getElementById("selected_Name").innerHTML;
    console.log(pokemonName);
    var entity = document.getElementById(pokemonName);
    var Number = entity.getAttribute("Number");
    var imgpath = "pic/sprites/"+Number+".png";

    // Change Icon in the team
    var grid_rival_team = document.getElementById("grid_rival_team");
    var containers = grid_rival_team.getElementsByTagName("img");
    console.log(containers);
    var i = 0;
    for (const element of containers){
        if(element.getAttribute("src") == "pic/plus.png"){
            element.setAttribute("src", imgpath);
            // Record the name of the pokemon
            element.setAttribute("Name", pokemonName);
            element.setAttribute("height", "60px");
            element.setAttribute("width", "60px");
            break;
        }
    }
    Redraw_comparing_chart();
}

function Delete_from_team(){
    this.setAttribute("src","pic/plus.png");
    this.setAttribute("Name", "");
    this.setAttribute("height", "30px");
    this.setAttribute("width", "30px");
    Redraw_comparing_chart();
    // Record the name of the pokemon
    
}

function Redraw_comparing_chart(){
    //get data from my team
    var grid_my_team = document.getElementById("grid_my_team");
    var containers = grid_my_team.getElementsByTagName("img");
    var Total_HP_myteam = 0;
    var Total_Attack_myteam = 0;
    var Total_Defense_myteam = 0;
    var Total_Sp_Atk_myteam = 0;
    var Total_Sp_Def_myteam = 0;
    var Total_Speed_myteam = 0;
    for (const element of containers){
        var pkname = element.getAttribute("Name");
        if(pkname==""){}
        else{
            var entity = document.getElementById(pkname);
            Total_HP_myteam = parseInt(Total_HP_myteam) + parseInt(entity.getAttribute("HP"));
            Total_Attack_myteam = parseInt(Total_Attack_myteam) + parseInt(entity.getAttribute("Attack"));
            Total_Defense_myteam = parseInt(Total_Defense_myteam) + parseInt(entity.getAttribute("Defense"));
            Total_Sp_Atk_myteam = parseInt(Total_Sp_Atk_myteam) + parseInt(entity.getAttribute("Sp_Atk"));
            Total_Sp_Def_myteam = parseInt(Total_Sp_Def_myteam) + parseInt(entity.getAttribute("Sp_Def"));
            Total_Speed_myteam = parseInt(Total_Speed_myteam) + parseInt(entity.getAttribute("Speed"));
        }
    }

    //get data from rival team
    var grid_rival_team = document.getElementById("grid_rival_team");
    var containers = grid_rival_team.getElementsByTagName("img");
    var Total_HP_rivalteam = 0;
    var Total_Attack_rivalteam = 0;
    var Total_Defense_rivalteam = 0;
    var Total_Sp_Atk_rivalteam = 0;
    var Total_Sp_Def_rivalteam = 0;
    var Total_Speed_rivalteam = 0;
    for (const element of containers){
        var pkname = element.getAttribute("Name");
        if(pkname==""){}
        else{
            var entity = document.getElementById(pkname);
            Total_HP_rivalteam = parseInt(Total_HP_rivalteam) + parseInt(entity.getAttribute("HP"));
            Total_Attack_rivalteam = parseInt(Total_Attack_rivalteam) + parseInt(entity.getAttribute("Attack"));
            Total_Defense_rivalteam = parseInt(Total_Defense_rivalteam) + parseInt(entity.getAttribute("Defense"));
            Total_Sp_Atk_rivalteam = parseInt(Total_Sp_Atk_rivalteam) + parseInt(entity.getAttribute("Sp_Atk"));
            Total_Sp_Def_rivalteam = parseInt(Total_Sp_Def_rivalteam) + parseInt(entity.getAttribute("Sp_Def"));
            Total_Speed_rivalteam = parseInt(Total_Speed_rivalteam) + parseInt(entity.getAttribute("Speed"));
        }
    }

    console.log("Total_HP_myteam"+Total_HP_myteam)
    console.log("Total_HP_rivalteam"+Total_HP_rivalteam)
    var myvalues = [parseInt(Total_HP_myteam),parseInt(Total_Sp_Atk_myteam),parseInt(Total_Sp_Def_myteam),
                    parseInt(Total_Speed_myteam),parseInt(Total_Defense_myteam),parseInt(Total_Attack_myteam)];
    var rivalvalues = [parseInt(Total_HP_rivalteam),parseInt(Total_Sp_Atk_rivalteam),parseInt(Total_Sp_Def_rivalteam),
                    parseInt(Total_Speed_rivalteam),parseInt(Total_Defense_rivalteam),parseInt(Total_Attack_rivalteam)];

      Draw_comparing_radar_2(myvalues,rivalvalues);
}

function Create_recommendation_list(){
    // get pokemons of my team
    var my_pokemons = [];
    var grid_my_team = document.getElementById("grid_my_team");
    var containers = grid_my_team.getElementsByTagName("img");
    for(const element of containers){
        var name = element.getAttribute("Name");
        if(name != ""){
            my_pokemons.push(element.getAttribute("Name"));
        }
        
    }
    //get types from tival team
    var rival_types = []
    var grid_rival_team = document.getElementById("grid_rival_team");
    var containers = grid_rival_team.getElementsByTagName("img");
    for(const element of containers){
        if(name != ""){
            rival_types.push(element.getAttribute("Type_1"));
            if(rival_types.push(element.getAttribute("Type_2")) != ""){
                rival_types.push(element.getAttribute("Type_2"));
            }
        }
    }
    // get selected generation from button

    // create recommendation list
    var result_list = []
    var candidates = ["Goodra","Tyranitar","Dragonite","Breloom","Arcanine", "Garchomp","Pangoro"]
    for(const element of my_pokemons){
        result_list.push(element);
    }

    for(i = 6-result_list.length; i>0 ; i--){
        result_list.push(candidates[i]);
    }

    var recommendation_rows = d3.select("#recommendation_rows");
    for(const element of result_list){
        var pokemon = document.getElementById(element);

        var img_Path = "pic/sprites/"+pokemon.getAttribute("Number")+".png";
        var Pk_Name = pokemon.getAttribute("Name");

        var entity = recommendation_rows.append("entity");
        entity.attr("class","tile m-0 level");
        entity.attr("style","border: 1px solid rgb(137, 137, 137);");
        
        tile_icon = entity.insert("Eicon");
        tile_icon.attr("class","tile__icon");
        tile_icon.append("img").attr("src",img_Path).attr("width","50px").attr("height","50px");

        tile_container = entity.append("Ename");
        tile_container.attr("class","tile__container");
        tile_container.append("p").attr("class","tile__title m-0").text(Pk_Name)
    }

}

function Draw_type_generation_line_chart(){
    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 10, bottom: 50, left: 40},
        width = 550 - margin.left - margin.right,
        height = 360 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#generation_type")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",`translate(${margin.left},${margin.top})`);
        var dataReady = [
            {name:"Bug",values:[{time:"1" ,value: 336 },{time:"2",value: 395 },{time:"3" ,value: 334 },{time:"4",value: 357 },{time:"5",value: 416 },{time:"6",value: 275 }]},
            {name:"Dark",values:[{time:"1" ,value: 411},{time:"2",value: 465 },{time:"3" ,value: 401 },{time:"4",value: 487 },{time:"5",value: 412 },{time:"6",value: 495 }]},
            {name:"Dragon",values:[{time:"1" ,value: 440 },{time:"2",value: 540 },{time:"3" ,value: 506 },{time:"4",value: 558 },{time:"5",value: 510 },{time:"6",value: 457 }]},
            {name:"Electric",values:[{time:"1" ,value: 444 },{time:"2",value: 386 },{time:"3" ,value: 395 },{time:"4",value: 438 },{time:"5",value: 449 },{time:"6",value: 400 }]},
            {name:"Fairy",values:[{time:"1" ,value: 394 },{time:"2",value: 312 },{time:"3" ,value: 313 },{time:"4",value: 428 },{time:"5",value: 380 },{time:"6",value: 466 }]},
            {name:"Fighting",values:[{time:"1" ,value: 424 },{time:"2",value: 388 },{time:"3" ,value: 399 },{time:"4",value: 437 },{time:"5",value: 474 },{time:"6",value: 468 }]},
            {name:"Fire",values:[{time:"1" ,value: 456 },{time:"2",value: 436 },{time:"3" ,value: 413 },{time:"4",value: 478 },{time:"5",value: 447 },{time:"6",value: 451 }]},
            {name:"Flying",values:[{time:"1" ,value: 444 },{time:"2",value: 420 },{time:"3" ,value: 434 },{time:"4",value: 421 },{time:"5",value: 445 },{time:"6",value: 441 }]},
            {name:"Ghost",values:[{time:"1" ,value: 405 },{time:"2",value: 435 },{time:"3" ,value: 353 },{time:"4",value: 494 },{time:"5",value: 395 },{time:"6",value: 438 }]},
            {name:"Grass",values:[{time:"1" ,value: 400 },{time:"2",value: 399 },{time:"3" ,value: 388 },{time:"4",value: 438 },{time:"5",value: 409 },{time:"6",value: 416 }]},
            {name:"Ground",values:[{time:"1" ,value: 398 },{time:"2",value: 382 },{time:"3" ,value: 411 },{time:"4",value: 474 },{time:"5",value: 432 },{time:"6",value: 512 }]},
            {name:"Ice",values:[{time:"1" ,value: 514 },{time:"2",value: 353 },{time:"3" ,value: 432 },{time:"4",value: 479 },{time:"5",value: 453 },{time:"6",value: 425 }]},
            {name:"Normal",values:[{time:"1" ,value: 380 },{time:"2",value: 391 },{time:"3" ,value: 370 },{time:"4",value: 427 },{time:"5",value: 406 },{time:"6",value: 382 }]},
            {name:"Poison",values:[{time:"1" ,value: 382 },{time:"2",value: 401 },{time:"3" ,value: 402 },{time:"4",value: 403 },{time:"5",value: 381 },{time:"6",value: 407 }]},
            {name:"Psychic",values:[{time:"1" ,value: 456 },{time:"2",value: 459 },{time:"3" ,value: 428 },{time:"4",value: 473 },{time:"5",value: 423 },{time:"6",value: 454 }]},
            {name:"Rock",values:[{time:"1" ,value: 420 },{time:"2",value: 431 },{time:"3" ,value: 443 },{time:"4",value: 434 },{time:"5",value: 438 },{time:"6",value: 459 }]},
            {name:"Steel",values:[{time:"1" ,value: 395 },{time:"2",value: 485 },{time:"3" ,value: 463 },{time:"4",value: 504 },{time:"5",value: 463 },{time:"6",value: 441 }]},
            {name:"Water",values:[{time:"1" ,value: 413 },{time:"2",value: 417 },{time:"3" ,value: 401 },{time:"4",value: 441 },{time:"5",value: 424 },{time:"6",value: 423 }]},       
        ]
        // A color scale: one color for each group
        function myColor(Type_1){
            var color ='';
            if (Type_1=="Bug"){color = Bug_color};
            if (Type_1=="Dark"){color = Dark_color};
            if (Type_1=="Dragon"){color = Dragon_color};
            if (Type_1=="Electric"){color = Electric_color};
            if (Type_1=="Fairy"){color = Fairy_color};
            if (Type_1=="Fighting"){color = Fighting_color};
            if (Type_1=="Fire"){color = Fire_color};
            if (Type_1=="Flying"){color = Flying_color};
            if (Type_1=="Ghost"){color = Ghost_color};
            if (Type_1=="Grass"){color = Grass_color};
            if (Type_1=="Ground"){color = Ground_color};
            if (Type_1=="Ice"){color = Ice_color};
            if (Type_1=="Normal"){color = Normal_color};
            if (Type_1=="Poison"){color = Poison_color};
            if (Type_1=="Psychic"){color = Psychic_color};
            if (Type_1=="Rock"){color = Rock_color};
            if (Type_1=="Steel"){color = Steel_color};
            if (Type_1=="Water"){color = Water_color};
            return color
            }

        // Add X axis --> it is a date format
        const x = d3.scaleLinear()
        .domain([1,6])
        .range([ 0, width ]);
        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(6));

        // Add Y axis
        const y = d3.scaleLinear()
        .domain( [250,600])
        .range([ height, 0 ]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // Add the lines
        const line = d3.line()
        .x(d => x(+d.time))
        .y(d => y(+d.value))

        svg.selectAll("myLines")
        .data(dataReady)
        .join("path")
            .attr("class", d => d.name)
            .attr("d", d => line(d.values))
            .attr("stroke", d => myColor(d.name))
            .style("stroke-width", 3)
            .style("fill", "none")
            .style("opacity", "0.08")

        // Add the points
        svg
        // First we need to enter in a group
        .selectAll("myDots")
        .data(dataReady)
        .join('g')
            .style("fill", d => myColor(d.name))
            .attr("class", d => d.name)
        // Second we need to enter in the 'values' part of this group
        .selectAll("myPoints")
        .data(d => d.values)
        .join("circle")
            .attr("cx", d => x(d.time))
            .attr("cy", d => y(d.value))
            .attr("r", 3)
            .style("opacity", "0.5")


        // Add a label at the end of each line
        svg
        .selectAll("myLabels")
        .data(dataReady)
        .join('g')
            .append("text")
            .attr("class", d => d.name)
            .datum(d => { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
            .attr("transform", d => `translate(${x(d.value.time)},${y(d.value.value)})`) // Put the text at the position of the last point
            .attr("x", 12) // shift the text a bit more right
            .text(d => d.name)
            .style("fill", d => myColor(d.name))
            .style("font-size", 8)

        // Add a legend (interactive)
        svg
        .selectAll("myLegend")
        .data(dataReady)
        .join('g')
            .append("text")
            .attr('x', (d,i) => 30 + i*60)
            .attr('y', 30)
            .text(d => d.name)
            .style("fill", d => myColor(d.name))
            .style("font-size", 15)
            .on("click", function(event,d){
            // is the element currently visible ?
            currentOpacity = d3.selectAll("." + d.name).style("opacity")
            // Change the opacity: from 0 to 1 or from 1 to 0
            d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0.08:1)

            })
        
}
function Highlight_line(Type_1,Type_2){
    
    d3.selectAll("path").style("opacity","0.08");
    d3.selectAll("." + Type_1).transition().style("opacity", "1");
    d3.selectAll("." + Type_2).transition().style("opacity", "1");
}

function Draw_radar_2(values,Type_1){
    //deal with svg
    var svg = d3.select("#grid_radar_chart");
    svg.select('canvas').remove();
    svg.append('canvas')
            .attr('width', 200)
            .attr('id','grid_radar_chart2')
            .attr('height', 200);

    const ctx = document.getElementById("grid_radar_chart2");
    //picking color
    var color = '';
    if (Type_1=="Bug"){color = Bug_color};
    if (Type_1=="Dark"){color = Dark_color};
    if (Type_1=="Dragon"){color = Dragon_color};
    if (Type_1=="Electric"){color = Electric_color};
    if (Type_1=="Fairy"){color = Fairy_color};
    if (Type_1=="Fighting"){color = Fighting_color};
    if (Type_1=="Fire"){color = Fire_color};
    if (Type_1=="Flying"){color = Flying_color};
    if (Type_1=="Ghost"){color = Ghost_color};
    if (Type_1=="Grass"){color = Grass_color};
    if (Type_1=="Ground"){color = Ground_color};
    if (Type_1=="Ice"){color = Ice_color};
    if (Type_1=="Normal"){color = Normal_color};
    if (Type_1=="Poison"){color = Poison_color};
    if (Type_1=="Psychic"){color = Psychic_color};
    if (Type_1=="Rock"){color = Rock_color};
    if (Type_1=="Steel"){color = Steel_color};
    if (Type_1=="Water"){color = Water_color};

    const data = {
    labels: [
        'HP',
        'Sp_Atk',
        'Sp_Def',
        'Speed',
        'Def',
        'Atk',
    ],
    datasets: [{
    label: "Status",
    data: values,
    fill: true,
    backgroundColor: color,
    borderColor: color,
    pointBackgroundColor: color,
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: color
  }]
};

const config = {
  type: 'radar',
  data: data,
  options: {
    responsive: true, 
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 3 
      }
    },
    scale:{
        max: 200,
        min: 0
    }
  }
};
const myChart = new Chart(ctx, config);
}

function Draw_comparing_radar_2(myvalues,rivalvalues){
    var svg = d3.select("#grid_comparing_radar_chart");
    svg.select('canvas').remove();
    svg.append('canvas')
            .attr('width', 200)
            .attr('id','comparing_radar_chart')
            .attr('height', 200);

    const ctx = document.getElementById("comparing_radar_chart");
    console.log(ctx)

    const data = {
    labels: [
        'Total_HP',
        'Total_Sp_Atk',
        'Total_Sp_Def',
        'Total_Speed',
        'Total_Def',
        'Total_Atk',
    ],
    datasets: [{
    label: "My team",
    data: myvalues,
    fill: true,
    backgroundColor: "rgba(255, 221, 0, 0.6)",
    borderColor: "rgba(255, 221, 0)",
    pointBackgroundColor: "rgba(255, 221, 0)",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: "rgba(255, 221, 0)"
  },{
    label: "Rival team",
    data: rivalvalues,
    fill: true,
    backgroundColor: 'rgba(57, 109, 228, 0.6)',
    borderColor: 'rgb(57, 109, 228)',
    pointBackgroundColor: 'rgb(57, 109, 228)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(57, 109, 228)'
  }]
};

const config = {
  type: 'radar',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 3 
      }
    },
    scale:{
        max: 600,
        min: 0
    }
  }
};
const myChart = new Chart(ctx, config);
}

function Draw_winrate_type(){
    const margin = {top: 20, right: 10, bottom: 50, left: 40},
    width = 550 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#winrate_type")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //Read the data
    d3.csv("winrate_types_data").then(function(data) {

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    const myGroups = Array.from(new Set(data.map(d => d.group)))
    const myVars = Array.from(new Set(data.map(d => d.variable)))

    // Build X scales and axis:
    const x = d3.scaleBand()
        .range([ 0, width ])
        .domain(myGroups)
        .padding(0.05);
    svg.append("g")
        .style("font-size", 15)
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    const y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(myVars)
        .padding(0.05);
    svg.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()

    // Build color scale
    var myColor = d3.scaleLinear()
    .range(["white","red"])
    .domain([0,100])

    // create a tooltip
    const buble = d3.select("#winrateinfo");
    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(event,d) {
        buble.html(d.group+" type pokemons have a winrate of " + (d.value*100).toFixed(2) +"% when facing "+ d.variable+ " type pokemons.");
    }
    const mouseleave = function(event,d) {
        buble.html("");
    }

    // add the squares
    svg.selectAll()
        .data(data, function(d) {return d.group+':'+d.variable;})
        .join("rect")
        .attr("x", function(d) { return x(d.group) })
        .attr("y", function(d) { return y(d.variable) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d.value*100)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    })
    }

    function Change_visualization(){
        var selection_id = this.getAttribute("id");
        var rows = document.getElementById("grid_visualization_container");
        var entities = rows.getElementsByTagName("vis");
        for (const element of entities){
            var vis_id = element.getAttribute("id");
            
            if (("selection_"+vis_id) == selection_id){
                element.setAttribute("style","");
            }
            else{
                element.setAttribute("style","display: none");
            }
        }
}

function Add_to_comparing_left(){
    // console.log("wojinlaila");

    // get selected entity features
    var pokemonName = document.getElementById("selected_Name").innerHTML;
    console.log(pokemonName);
    var entity = document.getElementById(pokemonName);
    var Number = entity.getAttribute("Number");
    var imgpath = "pic/hires/"+Number+".png";

    // Change Icon in the team
    var compare_left = document.getElementById("compare_left");
    var containers = compare_left.getElementsByTagName("img");
    console.log(containers);
    var i = 0;
    for (const element of containers){
        //if(element.getAttribute("src") == "pic/default.png"){
            element.setAttribute("src", imgpath);
            // Record the name of the pokemon
            element.setAttribute("Name", pokemonName);
            break;
        //}
    }

    // Change name in the team
    document.getElementById("pokemon_left_Name").setAttribute("class","tag tag--Electric")
    document.getElementById("pokemon_left_Name").innerHTML = pokemonName;
    
    //Redraw_comparing_chart();
    var Type_1 = entity.getAttribute("Type_1");
    var Type_2 = entity.getAttribute("Type_2");
    var Generation = entity.getAttribute("Generation");
    var Number = entity.getAttribute("Number");
   // var Total = entity.getAttribute("Total");
    var HP = entity.getAttribute("HP");
    var Speed = entity.getAttribute("Speed");
    var Attack = entity.getAttribute("Attack");
    var Defense = entity.getAttribute("Defense");
    var Sp_Atk = entity.getAttribute("Sp_Atk");
    var Sp_Def = entity.getAttribute("Sp_Def");
    var isLegendary = entity.getAttribute("isLegendary");
    
    type1_class = "tag tag--"+Type_1;
    document.getElementById("pokemon_left_Type_1").setAttribute("class",type1_class)
    document.getElementById("pokemon_left_Type_1").innerHTML = Type_1;

    if (Type_2==""){
        document.getElementById("pokemon_left_Type_2").setAttribute("style","display:none; margin:0 auto;justify-content:center;width: 50px;height: 20px;")
    }
    else{
        type2_class = "tag tag--"+Type_2;
        document.getElementById("pokemon_left_Type_2").setAttribute("style","margin:0 auto;justify-content:center;width: 50px;height: 20px;")
        document.getElementById("pokemon_left_Type_2").setAttribute("class",type2_class)
        document.getElementById("pokemon_left_Type_2").innerHTML = Type_2;
    }
    // legendary
    if(isLegendary == "TRUE"){
        document.getElementById("pokemon_left_isLegendary").innerHTML = "YES"
    }
    else{
        document.getElementById("pokemon_left_isLegendary").innerHTML = "NO"
    }

    document.getElementById("pokemon_left_Generation").innerHTML = Generation;
    //document.getElementById("pokemon_left_Total").innerHTML = "Species strength: "+Total;
    document.getElementById("pokemon_left_HP").innerHTML = HP;
    document.getElementById("pokemon_left_Speed").innerHTML = Speed;
    document.getElementById("pokemon_left_Attack").innerHTML = Attack;
    document.getElementById("pokemon_left_Defense").innerHTML = Defense;
    document.getElementById("pokemon_left_Sp_Atk").innerHTML = Sp_Atk;
    document.getElementById("pokemon_left_Sp_Def").innerHTML = Sp_Def;

    Redraw_comparing_pk_chart();
    predict_winner();
    draw_winrate_chart()
}

function Add_to_comparing_right(){
    // console.log("wojinlaila");

    // get selected entity features
    var pokemonName = document.getElementById("selected_Name").innerHTML;
    console.log(pokemonName);
    var entity = document.getElementById(pokemonName);
    var Number = entity.getAttribute("Number");
    var imgpath = "pic/hires/"+Number+".png";

    // Change Icon in the team
    var compare_right = document.getElementById("compare_right");
    var containers = compare_right.getElementsByTagName("img");
    console.log(containers);
    var i = 0;
    for (const element of containers){
        //if(element.getAttribute("src") == "pic/default.png"){
            element.setAttribute("src", imgpath);
            // Record the name of the pokemon
            element.setAttribute("Name", pokemonName);
            break;
        //}
    }

    // Change name in the team
    document.getElementById("pokemon_right_Name").setAttribute("class","tag tag--Water")
    document.getElementById("pokemon_right_Name").innerHTML = pokemonName;
    
    //Redraw_comparing_chart();
    var Type_1 = entity.getAttribute("Type_1");
    var Type_2 = entity.getAttribute("Type_2");
    var Generation = entity.getAttribute("Generation");
    var Number = entity.getAttribute("Number");
    //var Total = entity.getAttribute("Total");
    var HP = entity.getAttribute("HP");
    var Speed = entity.getAttribute("Speed");
    var Attack = entity.getAttribute("Attack");
    var Defense = entity.getAttribute("Defense");
    var Sp_Atk = entity.getAttribute("Sp_Atk");
    var Sp_Def = entity.getAttribute("Sp_Def");
    var isLegendary = entity.getAttribute("isLegendary");
    
    type1_class = "tag tag--"+Type_1;
    document.getElementById("pokemon_right_Type_1").setAttribute("class",type1_class)
    document.getElementById("pokemon_right_Type_1").innerHTML = Type_1;

    if (Type_2==""){
        document.getElementById("pokemon_right_Type_2").setAttribute("style","display:none; margin:0 auto;justify-content:center;width: 50px;height: 20px;")
    }
    else{
        type2_class = "tag tag--"+Type_2;
        document.getElementById("pokemon_right_Type_2").setAttribute("style","margin:0 auto;justify-content:center;width: 50px;height: 20px;")
        document.getElementById("pokemon_right_Type_2").setAttribute("class",type2_class)
        document.getElementById("pokemon_right_Type_2").innerHTML = Type_2;
    }
    // legendary
    if(isLegendary == "TRUE"){
        document.getElementById("pokemon_right_isLegendary").innerHTML = "YES"
    }
    else{
        document.getElementById("pokemon_right_isLegendary").innerHTML = "NO"
    }

    document.getElementById("pokemon_right_Generation").innerHTML = Generation;
    //document.getElementById("pokemon_left_Total").innerHTML = "Species strength: "+Total;
    document.getElementById("pokemon_right_HP").innerHTML = HP;
    document.getElementById("pokemon_right_Speed").innerHTML = Speed;
    document.getElementById("pokemon_right_Attack").innerHTML = Attack;
    document.getElementById("pokemon_right_Defense").innerHTML = Defense;
    document.getElementById("pokemon_right_Sp_Atk").innerHTML = Sp_Atk;
    document.getElementById("pokemon_right_Sp_Def").innerHTML = Sp_Def;

    Redraw_comparing_pk_chart();
    predict_winner();
    draw_winrate_chart()
}


function Redraw_comparing_pk_chart(){
    //get data from my team
   // var compare_left = document.getElementById("compare_left");
   // var compare_right = document.getElementById("compare_right");

   var svg=d3.select("#draw_compare_chart");
   svg.select('canvas').remove();
   svg.append('canvas')
            .attr('id','grid_compare_chart')

    const ctx=document.getElementById("grid_compare_chart");

    const DATA_COUNT = 6;
   // const NUMBER_CFG = {count: DATA_COUNT, min: -200, max: 200};

    var pokemonName_left = document.getElementById("pokemon_left_Name").innerHTML;
    //console.log(pokemonName_left);
    var entity_left = document.getElementById(pokemonName_left);
    var pokemonName_right = document.getElementById("pokemon_right_Name").innerHTML;
    //console.log(pokemonName_right);
    var entity_right = document.getElementById(pokemonName_right);

    if(pokemonName_left=='TO BE SELECTED'){
        var HP_left = 0;
        var Speed_left = 0;
        var Attack_left = 0;
        var Defense_left = 0;
        var Sp_Atk_left = 0;
        var Sp_Def_left = 0;
    }
    else{
        var HP_left = entity_left.getAttribute("HP");
        var Speed_left = entity_left.getAttribute("Speed");
        var Attack_left = entity_left.getAttribute("Attack");
        var Defense_left = entity_left.getAttribute("Defense");
        var Sp_Atk_left = entity_left.getAttribute("Sp_Atk");
        var Sp_Def_left = entity_left.getAttribute("Sp_Def");
    }

    if(pokemonName_right=='TO BE SELECTED'){
        var HP_right = 0;
        var Speed_right = 0;
        var Attack_right = 0;
        var Defense_right = 0;
        var Sp_Atk_right = 0;
        var Sp_Def_right = 0;
    }
    else{
        var HP_right = entity_right.getAttribute("HP");
        var Speed_right = entity_right.getAttribute("Speed");
        var Attack_right = entity_right.getAttribute("Attack");
        var Defense_right = entity_right.getAttribute("Defense");
        var Sp_Atk_right = entity_right.getAttribute("Sp_Atk");
        var Sp_Def_right = entity_right.getAttribute("Sp_Def");
    }

    

    const labels = ['ATK','DEF','Speed','SP_ATK','SP_DEF','HP'];
    const data = {
    labels: labels,
     datasets: [
      {
        label: pokemonName_left,
        data: [HP_left,Speed_left,Attack_left,Defense_left,Sp_Atk_left,Sp_Def_left],
        borderColor: 'rgba(255, 221, 0)',
        backgroundColor: 'rgba(255, 221, 0)',
        },
        {
        label: pokemonName_right,
        data: [HP_right,Speed_right,Attack_right,Defense_right,Sp_Atk_right,Sp_Def_right],
        borderColor: 'rgba(57, 109, 228)',
        backgroundColor: 'rgba(57, 109, 228)',
        }
    ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
          indexAxis: 'y',
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          elements: {
            bar: {
              borderWidth: 2,
            }
          },
          responsive: true,
          plugins: {
            legend: {
                display: false,  
                position: 'right',
            },
            title: {
                display: false,
                text: 'Comparing chart'
            }
          }
        },
      };
    
      const myChart = new Chart(ctx, config);
}

function predict_winner(){

    var pokemonName_left = document.getElementById("pokemon_left_Name").innerHTML;
    //console.log(pokemonName_left);
    var entity_left = document.getElementById(pokemonName_left);
    var pokemonName_right = document.getElementById("pokemon_right_Name").innerHTML;
    //console.log(pokemonName_right);
    var entity_right = document.getElementById(pokemonName_right);

    if(pokemonName_left!='TO BE SELECTED' && pokemonName_right!='TO BE SELECTED'){
        var Total_left = entity_left.getAttribute("Total");
        var Total_right = entity_right.getAttribute("Total");
        if(Total_left > Total_right){
            var Number = entity_left.getAttribute("Number");
        }
        else if(Total_left < Total_right){
            var Number = entity_right.getAttribute("Number");
        }
        else{
            var i = Math.round(Math.random());
            if(i > 0){
                var Number = entity_left.getAttribute("Number");
            }
            else{
                var Number = entity_right.getAttribute("Number");
            }
        }
        var imgpath = "pic/hires/"+Number+".png";

        var compare_winner = document.getElementById("winrate");
        var containers = compare_winner.getElementsByTagName("img");
        console.log(containers);
        var i = 0;
        for (const element of containers){
        //if(element.getAttribute("src") == "pic/default.png"){
            element.setAttribute("src", imgpath);
            // Record the name of the pokemon
            //element.setAttribute("Name", pokemonName);
            break;
        //}
    }
    }
}

function draw_winrate_chart(){
    var svg=d3.select("#draw_winrate_chart");
    svg.select('canvas').remove();
    svg.append('canvas')
            .attr('id','grid_winrate_chart')
            .attr('width',200)
            .attr('height',40)

    var pokemonName_left = document.getElementById("pokemon_left_Name").innerHTML;
    //console.log(pokemonName_left);
    var entity_left = document.getElementById(pokemonName_left);
    var pokemonName_right = document.getElementById("pokemon_right_Name").innerHTML;
    //console.log(pokemonName_right);
    var entity_right = document.getElementById(pokemonName_right);

    if(pokemonName_left!='TO BE SELECTED' && pokemonName_right!='TO BE SELECTED'){
        console.log("wojinlaila")
        var Total_left = entity_left.getAttribute("Total");
        var Total_right = entity_right.getAttribute("Total");
        
        var leftcolor = 0.1
        var rightcolor = 0.1
        var labelArray = ["winrate"], leftData = [Total_left/(parseInt(Total_left)+parseInt(Total_right))],rightData = [Total_right/(parseInt(Total_left)+parseInt(Total_right))];

        if(Total_left > Total_right){
            leftcolor=1;
        }
        else if(Total_left < Total_right){
            rightcolor = 1
        }
        else{
            var i = Math.round(Math.random());
            if(i > 0){
                leftcolor=1;
            }
            else{
                rightcolor = 1
            }
        }

        var ctx = document.getElementById("grid_winrate_chart");
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labelArray,
                datasets: [{
                    label: pokemonName_left,
                    data: leftData,
                    backgroundColor: 'rgba(255, 221, 0,'+leftcolor+')',
                    borderColor: 'rgba(255, 221, 0,'+leftcolor+')',
                    borderWidth: 1,
                },
                {
                    label: pokemonName_right,
                    data: rightData,
                    backgroundColor: 'rgba(57, 109, 228,'+rightcolor+')',
                    borderColor: 'rgba(57, 109, 228,'+rightcolor+')',
                    borderWidth: 1,
                }]
            },
            options: {
            indexAxis: 'y',
            scales: {
                x: {
                    display: false,
                    stacked: true,
                  },
                  y: {
                    display: false,
                    stacked: true
                  }
                },
            plugins: {
                legend: {
                        display: false,  
                        position: 'right',
                    },
                    title: {
                        display: false,
                        text: 'winrate chart'
                    },
            datalabels: {
                color: 'white',
                font: {
                weight: 'bold'
                },
                /*formatter: function(value, context) {
                return value + '%';
                }*/
            }
            }
        }
        });
    }
}

function Delete_from_comparing(){
    console.log("wochuqule");
    console.log(this);
    this.setAttribute("src","pic/default.png");
    this.setAttribute("Name", "");
    //Redraw_comparing_chart();
    // Record the name of the pokemon
    
}