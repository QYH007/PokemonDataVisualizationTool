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
    console.log(newpath)
    document.getElementById("selected_icon").setAttribute("src",newpath);
 
    var data = [
        {
          className: Type_1, // optional can be used for styling
          axes: [
            {axis: "HP", value: HP}, 
            {axis: "ATK", value: Attack}, 
            {axis: "DEF", value: Defense},  
            {axis: "Speed", value: Speed},
            {axis: "SP_DEF", value: Sp_Def},
            {axis: "SP_ATK", value: Sp_Atk},  
          ]
        }
      ];
      
      Draw_Radar(data)

}

function Draw_Radar(data){
    RadarChart.defaultConfig.color = function() {};
    RadarChart.defaultConfig.radius = 3;
    RadarChart.defaultConfig.w = 200;
    RadarChart.defaultConfig.h = 200;
    RadarChart.defaultConfig.maxValue = 220;
    //开始画图
    var chart = RadarChart.chart();
    var cfg = chart.config(); // retrieve default config
    var svg = d3.select("body").select("#main").select("#topleft").select("#grid_topleft").select("#grid_radar_chart");
    svg.select('svg').remove();
    svg.append('svg')
            .attr('width', cfg.w + cfg.w + 50)
            .attr('height', cfg.h + cfg.h / 4);
    RadarChart.draw("#grid_radar_chart", data);
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
    // console.log("wojinlaila");

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
            break;
        }
    }
    Redraw_comparing_chart();
}

function Add_to_rival_team(){
    // console.log("wojinlaila");
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
            break;
        }
    }
    

    Redraw_comparing_chart();
}

function Delete_from_team(){
    console.log("wojinlaile");
    console.log(this);
    this.setAttribute("src","pic/plus.png");
    this.setAttribute("Name", "");
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

    var data = [
        [//my team
          {axis:"Total_HP",value: parseInt(Total_HP_myteam)},
          {axis:"Total_Sp_Atk",value: parseInt(Total_Sp_Atk_myteam)},
          {axis:"Total_Sp_Def",value: parseInt(Total_Sp_Def_myteam)},
          {axis:"Total_Speed",value: parseInt(Total_Speed_myteam)},
          {axis:"Total_Defense",value: parseInt(Total_Defense_myteam)},
          {axis:"Total_Attack",value: parseInt(Total_Attack_myteam)},
        ],[//rival team
            {axis:"Total_HP",value: parseInt(Total_HP_rivalteam)},
            {axis:"Total_Sp_Atk",value: parseInt(Total_Sp_Atk_rivalteam)},
            {axis:"Total_Sp_Def",value: parseInt(Total_Sp_Def_rivalteam)},
            {axis:"Total_Speed",value: parseInt(Total_Speed_rivalteam)},
            {axis:"Total_Defense",value: parseInt(Total_Defense_rivalteam)},
            {axis:"Total_Attack",value: parseInt(Total_Attack_rivalteam)},  
        ]
      ];
      Draw_radarChart(data)
    

}


function Draw_radarChart(data){
    var margin = {top: 2, right: 2, bottom: 2, left: 2},
    // width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    // height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20); 
    width = 500;
    height = 250;
    var color = d3.scale.ordinal()
    .range(["#EDC951","#00A0B0"]);
    
    var radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue: 600,
    levels: 3,
    roundStrokes: false,
    color: color
    };
    //Call function to draw the Radar chart
    //Call function to draw the Radar chart
    //Call function to draw the Radar chart
    //Call function to draw the Radar chart
    //Call function to draw the Radar chart
    
    // function RadarChart(id, data, options) {
        var cfg = {
         w: 600,				//Width of the circle
         h: 600,				//Height of the circle
         margin: {top: 10, right: 10, bottom: 10, left: 10}, //The margins of the SVG
         levels: 3,				//How many levels or inner circles should there be drawn
         maxValue: 0, 			//What is the value that the biggest circle will represent
         labelFactor: 1 , 	//How much farther than the radius of the outer circle should the labels be placed
         wrapWidth: 10, 		//The number of pixels after which a label needs to be given a new line
         opacityArea: 0.35, 	//The opacity of the area of the blob
         dotRadius: 4, 			//The size of the colored circles of each blog
         opacityCircles: 0.1, 	//The opacity of the circles of each blob
         strokeWidth: 2, 		//The width of the stroke around each blob
         roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
         color: d3.scale.category10()	//Color function
        };
        
        //Put all of the options into a variable called cfg
        if('undefined' !== typeof radarChartOptions){
          for(var i in radarChartOptions){
            if('undefined' !== typeof radarChartOptions[i]){ cfg[i] = radarChartOptions[i]; }
          }//for i
        }//if
        
        //If the supplied maxValue is smaller than the actual one, replace by the max in the data
        var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
            
        var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
            total = allAxis.length,					//The number of different axes
            radius = Math.min(cfg.w/2-20, cfg.h/2-20), 	//Radius of the outermost circle
            Format = d3.format(".0f"),			 	//Percentage formatting
            angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
        
        //Scale for the radius
        var rScale = d3.scale.linear()
            .range([0, radius])
            .domain([0, maxValue]);
            
        /////////////////////////////////////////////////////////
        //////////// Create the container SVG and g /////////////
        /////////////////////////////////////////////////////////
    
        //Remove whatever chart with the same id/class was present before
        d3.select(".radarChart").select("svg").remove();
        
        //Initiate the radar chart SVG
        var svg = d3.select(".radarChart").append("svg")
                .attr("width",  cfg.w)
                .attr("height", cfg.h)
                .attr("class", "radar"+".radarChart");
        //Append a g element		
        var g = svg.append("g")
                .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");
        
        /////////////////////////////////////////////////////////
        ////////// Glow filter for some extra pizzazz ///////////
        /////////////////////////////////////////////////////////
        
        //Filter for the outside glow
        var filter = g.append('defs').append('filter').attr('id','glow'),
            feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
            feMerge = filter.append('feMerge'),
            feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
            feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');
    
        /////////////////////////////////////////////////////////
        /////////////// Draw the Circular grid //////////////////
        /////////////////////////////////////////////////////////
        
        //Wrapper for the grid & axes
        var axisGrid = g.append("g").attr("class", "axisWrapper");
        
        //Draw the background circles
        axisGrid.selectAll(".levels")
           .data(d3.range(1,(cfg.levels+1)).reverse())
           .enter()
            .append("circle")
            .attr("class", "gridCircle")
            .attr("r", function(d, i){return radius/cfg.levels*d;})
            .style("fill", "#CDCDCD")
            .style("stroke", "#CDCDCD")
            .style("fill-opacity", cfg.opacityCircles)
            .style("filter" , "url(#glow)");
    
        //Text indicating at what % each level is
        axisGrid.selectAll(".axisLabel")
           .data(d3.range(1,(cfg.levels+1)).reverse())
           .enter().append("text")
           .attr("class", "axisLabel")
           .attr("x", 4)
           .attr("y", function(d){return -d*radius/cfg.levels;})
           .attr("dy", "0.4em")
           .style("font-size", "10px")
           .attr("fill", "#737373")
           .text(function(d,i) { return Format(maxValue * d/cfg.levels); });
    
        /////////////////////////////////////////////////////////
        //////////////////// Draw the axes //////////////////////
        /////////////////////////////////////////////////////////
        
        //Create the straight lines radiating outward from the center
        var axis = axisGrid.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");
        //Append the lines
        axis.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
            .attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
            .attr("class", "line")
            .style("stroke", "white")
            .style("stroke-width", "2px");
    
        //Append the labels at each axis
        axis.append("text")
            .attr("class", "legend")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
            .attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
            .text(function(d){return d})
            .call(wrap, cfg.wrapWidth);
    
        /////////////////////////////////////////////////////////
        ///////////// Draw the radar chart blobs ////////////////
        /////////////////////////////////////////////////////////
        
        //The radial line function
        var radarLine = d3.svg.line.radial()
            .interpolate("linear-closed")
            .radius(function(d) { return rScale(d.value); })
            .angle(function(d,i) {	return i*angleSlice; });
            
        if(cfg.roundStrokes) {
            radarLine.interpolate("cardinal-closed");
        }
                    
        //Create a wrapper for the blobs	
        var blobWrapper = g.selectAll(".radarWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarWrapper");
                
        //Append the backgrounds	
        blobWrapper
            .append("path")
            .attr("class", "radarArea")
            .attr("d", function(d,i) { return radarLine(d); })
            .style("fill", function(d,i) { return cfg.color(i); })
            .style("fill-opacity", cfg.opacityArea)
            .on('mouseover', function (d,i){
                //Dim all blobs
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", 0.1); 
                //Bring back the hovered over blob
                d3.select(this)
                    .transition().duration(200)
                    .style("fill-opacity", 0.7);	
            })
            .on('mouseout', function(){
                //Bring back all blobs
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", cfg.opacityArea);
            });
            
        //Create the outlines	
        blobWrapper.append("path")
            .attr("class", "radarStroke")
            .attr("d", function(d,i) { return radarLine(d); })
            .style("stroke-width", cfg.strokeWidth + "px")
            .style("stroke", function(d,i) { return cfg.color(i); })
            .style("fill", "none")
            .style("filter" , "url(#glow)");		
        
        //Append the circles
        blobWrapper.selectAll(".radarCircle")
            .data(function(d,i) { return d; })
            .enter().append("circle")
            .attr("class", "radarCircle")
            .attr("r", cfg.dotRadius)
            .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
            .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
            .style("fill", function(d,i,j) { return cfg.color(j); })
            .style("fill-opacity", 0.8);
    
        /////////////////////////////////////////////////////////
        //////// Append invisible circles for tooltip ///////////
        /////////////////////////////////////////////////////////
        
        //Wrapper for the invisible circles on top
        var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarCircleWrapper");
            
        //Append a set of invisible circles on top for the mouseover pop-up
        blobCircleWrapper.selectAll(".radarInvisibleCircle")
            .data(function(d,i) { return d; })
            .enter().append("circle")
            .attr("class", "radarInvisibleCircle")
            .attr("r", cfg.dotRadius*1.5)
            .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
            .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function(d,i) {
                newX =  parseFloat(d3.select(this).attr('cx')) - 10;
                newY =  parseFloat(d3.select(this).attr('cy')) - 10;
                        
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(Format(d.value))
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function(){
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
            
        //Set up the small tooltip for when you hover over a circle
        var tooltip = g.append("text")
            .attr("class", "tooltip")
            .style("opacity", 0);
        
        /////////////////////////////////////////////////////////
        /////////////////// Helper Function /////////////////////
        /////////////////////////////////////////////////////////
    
        //Taken from http://bl.ocks.org/mbostock/7555321
        //Wraps SVG text	
        function wrap(text, width) {
          text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.4, // ems
                y = text.attr("y"),
                x = text.attr("x"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
                
            while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(" "));
              if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
              }
            }
          });
        }//wrap	
        
    }//RadarChart
// }
