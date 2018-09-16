const drumbanks = ['808', 'Hip_Hop', 'Trap', 'Bongos']
const drumbankSet = new Set(drumbanks)



const padMap = {
	'808': ['kick', 'snare'],
	'Hip_Hop': ['kick', 'snare'],
	'Trap': ['kick', 'snare'],
	'Bongos': ['high', 'low']
}

const scratches = [
	'100SP05',
	'110SP08',
	'120SP11',
	'130SP16',
	'140SP04',
]


const soundCache = {

}

//pad 0 or 1
//level 1 - 4
function getSoundPath(bankname, pad, level){
	var pad = padMap[bankname][pad]
	var sample_path = "./Soundfiles/" + bankname + "/" + bankname + '_' + pad + '_' + level + '.wav'
	return sample_path
}

function getScratchPath(scratch_num){
	var scratch_path ='./Soundfiles/Vinyl_Scratches/' + scratches[scratch_num] + '.wav'
	return scratch_path
}

//pad 0 or 1
//level 0 to 1
function playSound(bankname, pad, level){
	path = getSoundPath(bankname, pad, Math.max(Math.min(Math.floor(level * 4), 4), 1) )
	console.log(path)
	if(soundCache[path]){
		soundCache[path].stop()
		soundCache[path].play()
	}else{
		console.log("SOUND NOT LOADED");
	}
}

function playScratch() {
	scratch_num = Math.floor(Math.random()*(scratches.length-1))
	path = getScratchPath(scratch_num)
	console.log(path)
	if(soundCache[path]){
		soundCache[path].stop()
		soundCache[path].play()
	}else{
		console.log("SOUND NOT LOADED");
	}
}

function loadPaths(paths, onload){
	rxjs.from(paths).pipe(
		rxjs.operators.concatMap(path => {
			console.log("LOADING:",path);
			if(!soundCache[path]){
				var sound = new Pizzicato.Sound(path, function(){
					console.log("LOADED:",path)
				})
				soundCache[path] = sound;
				return rxjs.of(sound);
			}else{
				return rxjs.of(soundCache[path])
			}

		}),
		rxjs.operators.tap(null, null, onload)
	).subscribe()
}

function loadScratches(onload){
	paths = []
	for (var i = 0; i < scratches.length; i++) {
		paths.push('./Soundfiles/Vinyl_Scratches/' + scratches[i] + '.wav')
	}
	loadPaths(paths, onload)
}

function loadDrumBank(bankname, onload){
	if(drumbankSet.has(bankname)){

		paths = [];

		pads = padMap[bankname]
		for(var i = 0; i < pads.length; i++){
			var pad = pads[i];
			for(var level = 1; level <= 4; level++){
				var sample_path = getSoundPath(bankname, i, level)
				console.log(sample_path)

				paths.push(sample_path);
				// var sample;
				// if(!soundCache[sample_path]){
				// 	console.log(sample_path + ": Loading...")

				// 	var sample = new Pizzicato.Sound(sample_path, function() {
    // 				// Sound loaded!
    // 				// acousticGuitar.play();
				// 		console.log(sample_path + ": Sample loaded")

    // 					soundCache[sample_path] = sample;
				// 	});
				// }
			}
		}
		console.log(paths);
		loadPaths(paths, onload)
		
	}else{
		console.log("bank doesn't exist");
	}
}
