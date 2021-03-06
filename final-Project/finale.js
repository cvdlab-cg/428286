

function view(){

function beziera_2D(f){ return BEZIER(S1)(f)}
function beziera_1D(controlp){ return BEZIER(S0)(controlp)}
var dom1D = INTERVALS(1)(32)
var dom2D = DOMAIN([[0,1],[0,1]])([30,30])

function b_Dom1D(controlpoints){
    return MAP(BEZIER(S0)(controlpoints))(dom1D)
}

function b_Dom2D(functions){
    return MAP(BEZIER(S1)(functions))(dom2D) 
}



function cerc(r,z){
    var points = [[1,0,z],[1,1,z],[0,1.62,z],[-1.22,1.22,z],[-2,0,z],[-1.22,-1.22,z],[0,-1.63,z],[1,-1,z],[1,0,z]];
    var c = points.map(function(point){return [point[0]*r,point[1]*r,point[2]]})
    var cerchio = b_Dom1D(c);
    return cerchio;
}

function cercBez(r,z){
    var points = [[1,0,z],[1,1,z],[0,1.62,z],[-1.22,1.22,z],[-2,0,z],[-1.22,-1.22,z],[0,-1.63,z],[1,-1,z],[1,0,z]];
    var c = points.map(function(point){return [point[0]*r,point[1]*r,point[2]]})
    var cerchio = beziera_1D(c);
    return cerchio;
}

var INTERP_S2S = function (sel) {
    return function (args) { 
        var S1 = args[0];
        var S2 = args[1];

        return function (point) {
            z = sel(point);
            var S1uv = S1(point);
            var S2uv = S2(point);

            var mapped = new Array(3);
            var i;
            for (i = 0; i < 3; i += 1) { mapped[i] = S1uv[i] + z * (S2uv[i] - S1uv[i]);}
               return mapped;
       };
   };
}


uvz = DOMAIN([[0,1],[0,1],[0,1]])([24,5,5]);



var Tavolo = function(spessore){
    var latoDxSpicchio = beziera_1D([[0,0,spessore],[2,0.4,spessore]])
    var latoSxSpicchio = beziera_1D([[0,0,spessore],[2,-0.4,spessore]])
    var v = b_Dom2D([latoSxSpicchio,latoDxSpicchio])

    var curva = beziera_1D([[2,0.4,spessore],[2,0,spessore],[2,-0.4,spessore]])
    var curva1 = beziera_1D([[2,0.4,spessore],[2.07,0,spessore],[2,-0.4,spessore]])
    var v1 = b_Dom2D([curva,curva1])

    var t = STRUCT([v,v1])
    var tav = COLOR([3,3,3])(STRUCT(REPLICA(16)([t,R([0,1])(PI/8)])))


    var lds = b_Dom1D([[0,0,spessore],[2,0.4,spessore]])
    var curvaInterna = b_Dom1D([[1.93,0.39,spessore],[2,0,spessore],[1.93,-0.39,spessore]])
    var c = b_Dom1D([[2,0.4,spessore],[2.07,0,spessore],[2,-0.4,spessore]])
    var linee = STRUCT([lds,c,curvaInterna])
    var lin = COLOR([0,49/255,83/255])(STRUCT(REPLICA(16)([linee,R([0,1])(PI/8)])))

    var tavolo = STRUCT([tav,lin])
    return tavolo
}



var cerchietto = cerc(0.143,0);
var cerchione = cerc(0.6,0);
var cerchi = STRUCT([cerchietto,cerchione])


var lineaQuad = b_Dom1D([[2,0.4,0],[1.93,0.386,0]])
var quadratini = COLOR([0,0,0])(STRUCT(REPLICA(5)([lineaQuad,T([0])([-0.001]),R([0,1])(-0.03928)])))
var lineaQuad1 = b_Dom1D([[2,-0.395,0],[1.93,-0.382,0]])
var quadratini1 = COLOR([0,0,0])(STRUCT(REPLICA(6)([lineaQuad1,T([0])([-0.001]),R([0,1])(0.03928)])))
var quadrati = STRUCT([quadratini1,quadratini])
var q = COLOR([0,29/255,63/255])(STRUCT(REPLICA(16)([quadrati,R([0,1])(PI/8)])))




var b = cercBez(0.14,-0.01);
var bb = beziera_1D([[0,0,-0.01]]);
cerchii = beziera_2D([b,bb])

var b1 = cercBez(0.14,0.01);
var bb1 = beziera_1D([[0,0,0.01]]);
cerchi1 = beziera_2D([b1,bb1]);

var Va = INTERP_S2S(S2)([cerchii,cerchi1]);
var VVV =COLOR([4,4,4])(MAP(Va)(uvz));


var spessore = -0.08
var lineaCollegamentoSpessore = b_Dom1D([[2,0.4,0],[2,0.4,spessore]])
var collegamentoSpessore = beziera_1D([[2,0.4,spessore],[2.07,0,spessore],[2,-0.4,spessore]])
var collegamentoSpessore1 = beziera_1D([[2,0.4,0],[2.07,0,0],[2,-0.4,0]])

var spessoreSpicchio = b_Dom2D([collegamentoSpessore1,collegamentoSpessore])

var sp = STRUCT([lineaCollegamentoSpessore,COLOR([3,3,3])(spessoreSpicchio)])
var spessoreTavolo = STRUCT(REPLICA(16)([sp,R([0,1])(PI/8)]))


tavolo_tondo = STRUCT([spessoreTavolo,VVV,q,cerchi,Tavolo(0),Tavolo(-0.08)])

///base
GRID = SIMPLEX_GRID;

var r = GRID([[-0.5,0.5,-0.5],[1.5],[-0.03,0.04]])
var r1 = GRID([[1.5],[-0.5,0.5,-0.5],[-0.03,0.04]])

base =T([0,1,2])([-0.75,-0.75,-2])(STRUCT([r,r1]))


var bb = GRID([[-0.5,0.5,-0.5],[1.5],[-0.07,0.001]])
var b1 = GRID([[1.5],[-0.5,0.5,-0.5],[-0.07,0.001]])

base3 =T([0,1,2])([-0.75,-0.75,-2])(STRUCT([bb,b1]))


var rr = GRID([[-0.51,0.48,-0.51],[1.5],[-0.071,0.12]])
var rr1 = GRID([[1.5],[-0.51,0.48,-0.51],[-0.071,0.12]])

var base1 =T([0,1,2])([-0.75,-0.75,-2])(STRUCT([rr,rr1]))


var b = GRID([[-0.51,0.48,-0.51],[1.5],[-0.191,0.001]])
var bb1 = GRID([[1.5],[-0.51,0.48,-0.51],[-0.191,0.001]])

var base2 =T([0,1,2])([-0.75,-0.75,-2])(STRUCT([b,bb1]))


var Base = STRUCT([COLOR([0,29/255,63/255])(base),COLOR([3,3,3])(base3),COLOR([0,29/255,63/255])(base1),COLOR([210/255+1,210/255+1,210/255+1])(base2)])



//gamba. davanti
x = 0.002
y = 0.05
var linea1 = b_Dom1D([[-0.24+x,0.75-x,0.191-2],[-0.24+x+y,0.68-x,0.6-2],[-0.3+x,1.2-x,1.6-2-0.08],[-0.3+x,1.2-x,0-0.08]])
var linea2 = b_Dom1D([[-0.08,0.75,0.191-2],[-0.08,0.68,0.6-2],[-0.08,1.2,1.6-2-0.08],[-0.08,1.2,0-0.08]])
var linea3 = b_Dom1D([[0.08,0.75,0.191-2],[0.08,0.68,0.6-2],[0.08,1.2,1.6-2-0.08],[0.08,1.2,0-0.08]])
var linea4 = b_Dom1D([[0.24-x,0.75-x,0.191-2],[0.24-x-y,0.68-x,0.6-2],[0.3-x,1.2-x,1.6-2-0.08],[0.3-x,1.2-x,0-0.08]])


var linea11 = b_Dom1D([[-0.24+x,0.65,0.191-2],[-0.24+x+y,0.58,0.6-2],[-0.3+x,1.1,1.6-2-0.08],[-0.3+x,1.1,0-0.08]])
var linea44 = b_Dom1D([[0.24-x,0.65,0.191-2],[0.24-x-y,0.58,0.6-2],[0.3-x,1.1,1.6-2-0.08],[0.3-x,1.1,0-0.08]])


var linee = STRUCT([linea1,linea2,linea3,linea4,linea11,linea44])

var curva1 = beziera_1D([[-0.24+x,0.75-x,0.191-2],[-0.24+x+y,0.68-x,0.6-2],[-0.3+x,1.2-x,1.6-2-0.08],[-0.3+x,1.2-x,0-0.08]])
var curva11 = beziera_1D([[-0.24+x,0.65,0.191-2],[-0.24+x+y,0.58,0.6-2],[-0.3+x,1.1,1.6-2-0.08],[-0.3+x,1.1,0-0.08]])
var curvaUno = b_Dom2D([curva1,curva11])

var curva4 = beziera_1D([[0.24-x,0.75-x,0.191-2],[0.24-x-y,0.68-x,0.6-2],[0.3-x,1.2-x,1.6-2-0.08],[0.3-x,1.2-x,0-0.08]])
var curva44 = beziera_1D([[0.24-x,0.65,0.191-2],[0.24-x-y,0.58,0.6-2],[0.3-x,1.1,1.6-2-0.08],[0.3-x,1.1,0-0.08]])
var curvaQuattro = b_Dom2D([curva4,curva44])

var curva2 = beziera_1D([[-0.08,0.75,0.191-2],[-0.08,0.68,0.6-2],[-0.08,1.2,1.6-2-0.08],[-0.08,1.2,0-0.08]])
var curva12 = beziera_1D([[-0.16,0.75-0.07,0.191-2],[-0.16,0.68-0.07,0.6-2],[-0.08,1.2-0.07,1.6-2-0.08],[-0.08,1.2-0.07,0-0.08]])
var curvaUnoDue = b_Dom2D([curva1,curva12,curva2])

var curva3 = beziera_1D([[0.08,0.75,0.191-2],[0.08,0.68,0.6-2],[0.08,1.2,1.6-2-0.08],[0.08,1.2,0-0.08]])
var curva23  = beziera_1D([[0,0.75-0.07,0.191-2],[0,0.68-0.07,0.6-2],[0,1.2-0.07,1.6-2-0.08],[0,1.2-0.07,0-0.08]])
var curvaDueTre = b_Dom2D([curva2,curva23,curva3])

var curva34 = beziera_1D([[0.16,0.75-0.07,0.191-2],[0.16,0.68-0.07,0.6-2],[0.16,1.2-0.07,1.6-2-0.08],[0.16,1.2-0.07,0-0.08]])

var curvaTreQuattro = b_Dom2D([curva3,curva34,curva4])

var curvaUnoQuattro = b_Dom2D([curva11,curva44])

var c1 = COLOR([3,3,3])(curvaUno)
var c4 = COLOR([3,3,3])(curvaQuattro)
var c12 = COLOR([3,3,3])(curvaUnoDue)
var c23 = COLOR([3,3,3])(curvaDueTre)
var c34 = COLOR([3,3,3])(curvaTreQuattro)
var c14 = COLOR([3,3,3])(curvaUnoQuattro)

col = STRUCT([c1,c4,c12,c23,c34,c14])

var colonna = STRUCT([col,COLOR([0,29/255,63/255])(linee)])

//ottagono
var lineaOttagono = b_Dom1D([[1.2,0.5,-2+0.03],[1.2,-0.5,-2+0.03]])
var contornoOttagono = STRUCT(REPLICA(8)([lineaOttagono,R([0,1])(PI/4)]))

var curvaOttagono = beziera_1D([[1.2,0.5,-2+0.03],[1.2,-0.5,-2+0.03]])
var spicchioOttagono = b_Dom2D([curvaOttagono,[0,0,-2+0.03]])
var ott = STRUCT(REPLICA(8)([spicchioOttagono,R([0,1])(PI/4)]))

var ottSotto = T([2])([-0.15])(ott)

var curvaOttagonoSotto = beziera_1D([[1.2,0.5,-2.15+0.03],[1.2,-0.5,-2.15+0.03]])
var spessoreOttagono = b_Dom2D([curvaOttagono,curvaOttagonoSotto])
var spess = STRUCT(REPLICA(8)([spessoreOttagono,R([0,1])(PI/4)]))

var ottagono = STRUCT([COLOR([3,3,3])(ott),contornoOttagono,COLOR([0,29/255,63/255])(ottSotto),COLOR([0,49/255,83/255])(spess)])


//piedi
var curvaPiede = beziera_1D([[1.2,0.5,-2.15+0.03],[1.2,0.3,-2.15+0.03]])
var curvaPiede1 = beziera_1D([[1.2,0.5,-2.15],[1.2,0.3,-2.15]])

var curvaPiede2 = beziera_1D([[1.2,-0.5,-2.15+0.03],[1.2,-0.3,-2.15+0.03]])
var curvaPiede3 = beziera_1D([[1.2,-0.5,-2.15],[1.2,-0.3,-2.15]])

var ss = STRUCT([b_Dom2D([curvaPiede,curvaPiede1]),b_Dom2D([curvaPiede2,curvaPiede3])])

var curvaPinterna = beziera_1D([[1.2,0.3,-2.15+0.03],[1,0.3,-2.15+0.03]])
var curvaPinterna1 = beziera_1D([[1.2,0.3,-2.15],[1,0.3,-2.15]])

var curvaPinterna2 = beziera_1D([[1.2,-0.3,-2.15+0.03],[1,-0.3,-2.15+0.03]])
var curvaPinterna3 = beziera_1D([[1.2,-0.3,-2.15],[1,-0.3,-2.15]])

var ss1 = STRUCT([b_Dom2D([curvaPinterna,curvaPinterna1]),b_Dom2D([curvaPinterna2,curvaPinterna3])])

var basePiede = b_Dom2D([curvaPiede1,beziera_1D([[1,0.5,-2.15],[1,0.3,-2.15]])])
var basePiede1 = b_Dom2D([curvaPiede3,beziera_1D([[1,-0.5,-2.15],[1,-0.3,-2.15]])])


piedini =  STRUCT(REPLICA(8)([STRUCT([ss1,ss,basePiede1,basePiede]),R([0,1])(PI/4)]))


//stondeggio base
var tondo0 = beziera_1D([[0.24,0.75,-2+0.192],[0.24,0.75,-2+0.07]])
var tondo2 = beziera_1D([[0.24,0.75,-2+0.192],[0.245,0.78,-2+0.07]])

var tondo1 = beziera_1D([[0.245,0.78,-2+0.07],[0,0.85,-2+0.07],[-0.245,0.78,-2+0.07]])
var tondo11 = beziera_1D([[0.24,0.75,-2+0.192],[-0.24,0.75,-2+0.192]])

var tondo00 = beziera_1D([[-0.24,0.75,-2+0.192],[-0.24,0.75,-2+0.07]])
var tondo22 = beziera_1D([[-0.24,0.75,-2+0.192],[-0.245,0.78,-2+0.07]])

var t02 = b_Dom2D([tondo0,tondo2])
var t0022 = b_Dom2D([tondo00,tondo22])
var t1 = b_Dom2D([tondo1,tondo11])

var t012 = COLOR([0,29/255,63/255])(STRUCT([t02,t0022,t1]))


var tondo0z = beziera_1D([[0.25,0.75,-2+0.03],[0.25,0.75,-2+0.07]])
var tondo2z = beziera_1D([[0.255,0.78,-2+0.03],[0.255,0.78,-2+0.07]])
var t02z = b_Dom2D([tondo0z,tondo2z])

var tondo1z = beziera_1D([[0.255,0.78,-2+0.07],[0,0.85,-2+0.07],[-0.255,0.78,-2+0.07]])
var tondo11z = beziera_1D([[0.25,0.75,-2+0.07],[-0.25,0.75,-2+0.07]])
var t1z = b_Dom2D([tondo1z,tondo11z])

var tondo00z = beziera_1D([[-0.25,0.75,-2+0.03],[-0.25,0.75,-2+0.07]])
var tondo22z = beziera_1D([[-0.255,0.78,-2+0.03],[-0.255,0.78,-2+0.07]])
var t0022z = b_Dom2D([tondo00z,tondo22z])


var rr = beziera_1D([[0.255,0.78,-2+0.03],[0,0.85,-2+0.03],[-0.255,0.78,-2+0.03]])

var i = COLOR([0,29/255,63/255])(STRUCT([t0022z,t02z,b_Dom2D([tondo1z,rr])]))

var iiz = STRUCT([COLOR([3,3,3])(t1z),i])

var stondeggiamento = STRUCT([t012,iiz])

colonnaBase = STRUCT([colonna,stondeggiamento])

var colonnaR = R([0,1])([PI/2])(colonnaBase)

var colonnaR1 = R([0,1])([PI/2])(colonnaR)

var colonnaR2 = R([0,1])([PI/2])(colonnaR1)

var colonne = STRUCT([colonnaBase,colonnaR,colonnaR1,colonnaR2])

tavolo = STRUCT([tavolo_tondo,Base,ottagono,COLOR([0,29/255,63/255])(piedini),colonne])

DRAW(tavolo)

}


