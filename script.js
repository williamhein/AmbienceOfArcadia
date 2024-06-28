var pageContainer = document.getElementById("pageContainer");
var musicContainer = document.getElementById("musicContainer");
var ambienceContainer = document.getElementById("ambienceContainer");
var soundContainer = document.getElementById("soundContainer");
var hiddenContainer = document.getElementById("hiddenContainer");
var presetContainer = document.getElementById("presetContainer");


//slider
function Effect(soundUrl,imageUrl,type="ambience",defaultvolume=20,hidden=false)
{
    this.type = type;
    this.name = soundUrl;

    this.parentElem = document.createElement("div");
    this.sliderElem = document.createElement("input");


    this.sliderElem.className = "slider";
    this.sliderElem.id = soundUrl;
    this.sliderElem.type = "range";
    this.sliderElem.min = "0";
    this.sliderElem.max = "100";
    this.sliderElem.value = "0";

    this.sliderImageElem = document.createElement("div");
    this.sliderImageElem.className = "slideimage";
    this.sliderImageElem.style.backgroundImage = "url('img/" + imageUrl + "')";

    this.sliderHiddenElem = document.createElement("div");
    this.sliderHiddenElem.className = "slidehide";
    
    this.sliderTextElem = document.createElement("div");
    this.sliderTextElem.innerHTML = soundUrl;
    this.sliderTextElem.className = "slidetext";

    this.parentElem.appendChild(this.sliderTextElem);
    this.parentElem.appendChild(this.sliderImageElem);
    this.parentElem.appendChild(this.sliderHiddenElem);
    this.parentElem.appendChild(this.sliderElem);

    this.defaultvolume = defaultvolume;

    this.sound = new Howl({
        src:['audio/'+soundUrl],
        onfade: function(x) {
            TurnOffSoundsWithZeroVolume();
        }
    });
    //this.sound.on('fade', function(){
    //    var sound = GetEffectByName(soundUrl);
    //    if(sound.playing()) sound.stop();
    //});
    this.sound.loop(true);
    this.sound.volume(0);
    
     if (type=="sound")
    {
        this.parentElem.className = "soundcontainer";
        this.sliderImageElem.className = "soundimage";
        this.sliderTextElem.className = "soundtext";
        this.sliderElem.style.display = "none";
        this.sound.loop(false);
    }

    this.hidden = hidden;

    this.AddElem = function ()
    {
        if (!this.hidden)
        {
            if (this.type=="sound") this.parentElem.className = "soundcontainer";
            else this.parentElem.className = "slidecontainer";
            
            if(hiddenContainer.contains(this.parentElem)) hiddenContainer.removeChild(this.parentElem);
            if(this.type=="ambience") ambienceContainer.appendChild(this.parentElem);
            else if (this.type=="music") musicContainer.appendChild(this.parentElem);
            else if (this.type=="sound") soundContainer.appendChild(this.parentElem);

            this.hidden = true;
        }
        else
        {
            this.parentElem.className = "hiddenslidecontainer";
            
            if(this.type=="ambience" && ambienceContainer.contains(this.parentElem)) ambienceContainer.removeChild(this.parentElem);
            else if (this.type=="music" && musicContainer.contains(this.parentElem)) musicContainer.removeChild(this.parentElem);
            else if (this.type=="sound" && soundContainer.contains(this.parentElem)) soundContainer.removeChild(this.parentElem);
            hiddenContainer.appendChild(this.parentElem);

            this.hidden = false;
        }
    }

    this.HideElem = function () 
    {

    }

    this.ShowElem = function () 
    {
        
    }

    this.AddElem();
}

var effects = [
    new Effect('lightrain1.mp3','rain.png'),
    new Effect('lightrain2.mp3','rain.png'),
    new Effect('thunder.mp3','thunderstorm.png'),
    new Effect('wind.mp3','wind.png'),
    new Effect('river.mp3','river.png','ambience'),
    new Effect('forest.mp3','trees.png'),
    new Effect('campfire.mp3','fire.png'),
    new Effect('wandering.mp3','moon.png'),
    new Effect('cave.mp3','cave.png'),
    new Effect('lowhum.mp3','signal.png'),
    new Effect('creaking.mp3','manor.png'),
    new Effect('medievalvillage.mp3','dragon.png'),
    new Effect('horseclops.mp3','horse.png','ambience'),
    new Effect('market.mp3','market.png','ambience'),
    new Effect('citytraffic.mp3','buildings.png'),
    new Effect('distantpolice.mp3','siren.png'),
    new Effect('peoplepanic.mp3','crowd.png'),
    new Effect('peoplebar.mp3','bar-counter.png'),
    new Effect('office.mp3','work.png'),

    new Effect('metalbattlemusic.mp3','swords.png',"music"),
    new Effect('spookymusic.mp3','spooky.png',"music"),
    new Effect('mystery.mp3','question.png','music'),
    new Effect('tensemystery.mp3','question.png','music'),
    new Effect('battlemusiclow.mp3','swords.png',"music"),
    new Effect('inspirationalmusic.mp3','swords.png','music'),
    new Effect('tensepath.mp3','trees.png','music'),
    new Effect('mysticforest.mp3','trees.png','music'),

    new Effect('mummy.mp3','mummy.png','sound'),
    new Effect('boom.mp3','explosion.png','sound'),
    new Effect('gunpistol.mp3','gun.png',"sound"),
    new Effect('firebreath.mp3','dragon.png',"sound"),
    new Effect('dragonroar.mp3','dragon.png',"sound"),
    
    

];

for(var i = 0; i < effects.length; i++)
{
    effects[i].sliderElem.setAttribute("oninput","SetVolume("+i+");");
    effects[i].sliderImageElem.setAttribute("onclick","SetVolume("+i+",-1);");
    effects[i].sliderTextElem.setAttribute("onclick","SetVolume("+i+",-1);");
    effects[i].sliderHiddenElem.setAttribute("onclick","effects["+i+"].AddElem(false);");
}

function SetVolume(index,vol=null)
{
    if (vol==null)
    {
        var volume = effects[index].sliderElem.value/100;

        if (volume == 0)
        {
            effects[index].sound.stop();
        }
        else
        {
            effects[index].sound.volume(volume);
            if(!effects[index].sound.playing()) effects[index].sound.play();
        }
    }
    else
    {
        if (effects[index].type=="sound")
        {
            effects[index].sound.volume(0.5);
            effects[index].sound.play();
        }
        else if(!effects[index].sound.playing()) 
        {
            effects[index].sliderElem.value = (vol==-1)?effects[index].defaultvolume:vol;
            effects[index].sound.volume((vol==-1)?effects[index].defaultvolume/100:vol/100);
            effects[index].sound.play();
        }
        else
        {
            effects[index].sound.stop();
            effects[index].sliderElem.value = 0;
        }
    }
}

function ResetVolume(index,v) 
{
    const fadeDuration = 1000;

    if(effects[index].type=="sound") return;

    effects[index].sliderElem.value = v*100;

    if(v!=0)
    {
        if(!effects[index].sound.playing())
        {
            effects[index].sound.volume(0.01);
            effects[index].sound.play();
        }
        var currentVol = effects[index].sound.volume();
        effects[index].sound.fade(currentVol,v,fadeDuration);
    }
    else
    {
        var currentVol = effects[index].sound.volume();
        effects[index].sound.fade(currentVol,v,fadeDuration);
        //stopping after fade handled by fade event
        //if(effects[index].sound.playing()) effects[index].sound.stop();
    }
}

function TurnOffSoundsWithZeroVolume()
{
    for(var i = 0; i < effects.length; i++)
    {
        var sound = effects[i].sound;
        if(sound.playing() && sound.volume()==0)
        {
            sound.stop();
            //console.log(i," is no longer playing");
        }
    }
}

//minimize

var hiddenLegend = document.getElementById("hiddenLegend");
var presetLegend = document.getElementById("presetLegend");
var outterHiddenContainer = document.getElementById("outterHiddenContainer");
var outterPresetContainer = document.getElementById("outterPresetContainer");

presetLegend.addEventListener("click", function (e) {
    if(outterPresetContainer.classList.contains("minimize"))
    outterPresetContainer.className = "";
    else
    outterPresetContainer.classList.add("minimize");
});

hiddenLegend.addEventListener("click", function (e) {
    if(outterHiddenContainer.classList.contains("minimize"))
    outterHiddenContainer.className = "";
    else
    outterHiddenContainer.classList.add("minimize");
});


//presets

var presetSaveButton = document.getElementById("presetSave");
var presetRefreshButton = document.getElementById("presetRefresh");

function NameVolumePair(name, volume)
{
    this.name = name;
    this.volume = volume;
}

function Preset(name) {
    this.name = name;

    this.names = [];
    this.volumes = [];
    this.hiddenNames = [];

    this.parentElem = document.createElement("div");
    this.parentElem.className = "presetLineContainer";

    this.presetLineText = document.createElement("div");
    this.presetLineText.className = "presetLineText";
    
    this.presetLinePlayImage = document.createElement("div");
    this.presetLinePlayImage.className = "presetLinePlayImage";
    
    this.presetLineDeleteImage = document.createElement("div");
    this.presetLineDeleteImage.className = "presetLineDeleteImage";

    this.parentElem.appendChild(this.presetLineText);
    this.parentElem.appendChild(this.presetLinePlayImage);
    this.parentElem.appendChild(this.presetLineDeleteImage);
    
    this.AddElem = function (add=true)
    {
        if (add)
        {
            this.presetLineText.innerHTML = name;
            presetContainer.appendChild(this.parentElem);
        }
        else
        {
            if(presetContainer.contains(this.parentElem)) presetContainer.removeChild(this.parentElem);
        }
    }

    this.AddElem();
}

var presets = [];

function GetEffectByName(name)
{
    return  effects.find( (x) => x.name==name );
}

function GetPresetByName(name)
{
    return  presets.find( (x) => x.name==name );
}

function CreatePreset(name)
{
    if(GetPresetByName(name)!=undefined)
    {
        alert("Preset with name already exists.");
        return;
    }

    var preset = new Preset(name);
    for(var i = 0; i < effects.length; i++)
    {
        if(effects[i].sound.playing())
        {
            preset.names.push(effects[i].name);
            preset.volumes.push(effects[i].sound.volume());
        }
        if(!effects[i].hidden)
        {
            preset.hiddenNames.push(effects[i].name);
        }
    }
    console.log(preset);
    presets.push(preset);

    RefreshPresetFunctions();
}

function DeletePreset(name)
{
    var preset = presets.find( (x) => x.name==name );
    if(preset==undefined || !confirm("Delete preset '"+ preset.name + "'?"))
        return;
    var index = presets.indexOf(preset);

    if (index > -1) 
    {
        preset.AddElem(false);
        presets.splice(index, 1);
    }
}

function PlayPreset(name)
{
    var preset = GetPresetByName(name);
    if(preset==undefined) return;

    for(var i = 0; i < effects.length; i++)
    {
        if(effects[i].type!="sound")
        {
            if (preset.names.includes(effects[i].name))
            {    
                console.log(i, preset.volumes[preset.names.indexOf(effects[i].name)]);
                ResetVolume(i, preset.volumes[preset.names.indexOf(effects[i].name)]);
            }
            else
            {
                console.log(i,0);
                ResetVolume(i,0);
            }
        }
        if(preset.hiddenNames.includes(effects[i].name) && effects[i].hidden)
        {
            effects[i].hidden = true; //will be flipped in AddElem()
            effects[i].AddElem();
        }
        else
        {
            effects[i].hidden = false; //will be flipped in AddElem()
            effects[i].AddElem();
        }

    }
}

function SavePreset()
{
    CreatePreset(prompt("Enter preset name:")); 
}

function Refresh()
{
    for(var i = 0; i < effects.length; i++)
    {
        //if(effects[i].type!="sound") SetVolume(i,0); //hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        ResetVolume(i,0);
        effects[i].hidden = false; //will be flipped in AddElem()
        effects[i].AddElem();
    }
}

presetSaveButton.addEventListener("click", function (e) {
    SavePreset();
});

presetRefreshButton.addEventListener("click", function (e) {
    Refresh();
});

function RefreshPresetFunctions()
{
    for(var i = 0; i < presets.length; i++)
    {
        presets[i].presetLineDeleteImage.setAttribute('onclick',"DeletePreset('" + presets[i].name + "');");
        presets[i].presetLinePlayImage.setAttribute('onclick',"PlayPreset('" + presets[i].name + "');");
    }
}

function LoadPresetsFromStorage()
{
    
}

LoadPresetsFromStorage()



//extra sound functions

function HowlEcho(sound)
{
    var org = sound.play();
    var orgVol = sound.volume();

    setTimeout(() => {
        var echo1 = sound.play();
    
        sound.rate(0.9,echo1);
        sound.volume(Math.max(0,orgVol/2),echo1);
      }, 500);

    setTimeout(() => {
        var echo1 = sound.play();

        sound.rate(0.8,echo1);
        sound.volume(Math.max(0,orgVol/4),echo1);
    }, 1000);
}
