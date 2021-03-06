var LayerExpressionInterface = (function (){
   function toWorld(arr){
       var toWorldMat = new Matrix();
       toWorldMat.reset();
       this._elem.finalTransform.mProp.applyToMatrix(toWorldMat);
       if(this._elem.hierarchy && this._elem.hierarchy.length){
           var i, len = this._elem.hierarchy.length;
           for(i=0;i<len;i+=1){
               this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(toWorldMat);
           }
           return toWorldMat.applyToPointArray(arr[0],arr[1],arr[2]||0);
       }
       return toWorldMat.applyToPointArray(arr[0],arr[1],arr[2]||0);
   }


    return function(elem){

        function _registerMaskInterface(maskManager){
            _thisLayerFunction.mask = maskManager.getMask.bind(maskManager);
        }

        function _thisLayerFunction(name){
            switch(name){
                case "ADBE Root Vectors Group":
                    return _thisLayerFunction.shapeInterface;
                    //
                    break;
                case 4:
                    return elem.effectsManager;
            }
        }
        _thisLayerFunction.toWorld = toWorld;
        _thisLayerFunction.toComp = toWorld;
        _thisLayerFunction._elem = elem;
        Object.defineProperty(_thisLayerFunction, 'hasParent', {
            get: function(){
                return !!elem.hierarchy;
            }
        });
        Object.defineProperty(_thisLayerFunction, 'parent', {
            get: function(){
                return elem.hierarchy[0].layerInterface;
            }
        });
        Object.defineProperty(_thisLayerFunction, "rotation", {
            get: function(){
                return elem.transform.rotation;
            }
        });
        Object.defineProperty(_thisLayerFunction, "scale", {
            get: function () {
                return elem.transform.scale;
            }
        });

        Object.defineProperty(_thisLayerFunction, "position", {
            get: function () {
                    return elem.transform.position;
                }
        });

        Object.defineProperty(_thisLayerFunction, "anchorPoint", {
            get: function () {
                return elem.transform.anchorPoint;
            }
        });

        Object.defineProperty(_thisLayerFunction, "transform", {
            get: function () {
                return elem.transform;
            }
        });
        Object.defineProperty(_thisLayerFunction, "_name", { value:elem.data.nm });
        Object.defineProperty(_thisLayerFunction, "content", {
            get: function(){
                return _thisLayerFunction.shapeInterface;
            }
        });

        _thisLayerFunction.effect = elem.effectsManager;
        _thisLayerFunction.active = true;
        _thisLayerFunction.registerMaskInterface = _registerMaskInterface;
        return _thisLayerFunction;
    }
}());
