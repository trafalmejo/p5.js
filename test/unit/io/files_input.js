suite('Files', function() {

  var myp5 = new p5(function( sketch ) {
    sketch.setup = function() {};
    sketch.draw = function() {};
  });


  teardown(function(){
    myp5.remove();
  });

  //variable for preload
  var preload = myp5.preload;
  var result;

  // httpDo
  suite('httpDo()', function(){
    test('should be a function', function(){
      assert.ok(myp5.httpDo);
      assert.isFunction(myp5.httpDo);
    });

    test('should work when provided with just a path', function(done){
      myp5.httpDo('../unit/assets/sentences.txt', function(data){
        assert.ok(data);
        assert.isString(data);
        done();
      });
    });

    test('should accept method parameter', function(done){
      myp5.httpDo('../unit/assets/sentences.txt', 'GET', function(data){
        assert.ok(data);
        assert.isString(data);
        done();
      });
    });

    test('should accept type parameter', function(done){
      myp5.httpDo('../unit/assets/array.json', 'text', function(data){
        assert.ok(data);
        assert.isString(data);
        done();
      });
    });

    test('should accept method and type parameter together', function(done){
      myp5.httpDo('../unit/assets/array.json', 'GET', 'text', function(data){
        assert.ok(data);
        assert.isString(data);
        done();
      });
    });

    test('should pass error object to error callback function', function(done){
      myp5.httpDo('../unit/assets/sen.txt', function(data){
        // should not be called
      }, function(err){
        assert.isObject(err, 'err is an object');
        assert.isFalse(err.ok, 'err.ok is false');
        assert.equal(err.status, 404, 'Error status is 404');
        done();
      });
    });
  });

  // tests while preload is true without callbacks
  //myp5.preload = function() {};
  preload = true;

  // loadJSON()
  suite('loadJSON() in Preload', function () {

    test('preload is a Boolean', function() {
      assert.typeOf(preload, 'Boolean');
    });

    test('should be a function', function() {
      assert.ok(myp5.loadJSON);
      assert.typeOf(myp5.loadJSON, 'function');
    });

    test('should return an Object', function() {
      result = myp5.loadJSON('../unit/assets/array.json');
      assert.ok(result);
      assert.isObject(result, 'result is an object');
    });
  });

  // loadStrings()
  suite('loadStrings() in Preload', function(){

    test('should be a function', function() {
      assert.ok(myp5.loadStrings);
      assert.typeOf(myp5.loadStrings, 'function');
    });

    test('should return an array', function(){
      result = myp5.loadStrings('../unit/assets/sentences.txt');
      assert.ok(result);
      assert.isArray(result, 'result is and array');
    });
  });

  // loadXML()
  suite('loadXML() in Preload', function(){
    test('should be a function', function(){
      assert.ok(myp5.loadXML);
      assert.typeOf(myp5.loadXML, 'function');
    });

    // test('should return an Object', function() {
    //   result = loadXML('../unit/assets/books.xml');
    //   assert.ok(result);
    //   assert.isObject(result, 'result is an object');
    // });
  });

  //tests while preload is false with callbacks
  preload = false;

  // loadJSON()
  suite('myp5.loadJSON', function() {
    test('should be a function', function() {
      assert.ok(myp5.loadJSON);
      assert.typeOf(myp5.loadJSON, 'function');
    });

    test('should call callback function if provided', function(done){
      result = myp5.loadJSON('../unit/assets/array.json', function(data){
        done();
      });
    });

    test('should pass an Array to callback function', function(done){
      result = myp5.loadJSON('../unit/assets/array.json', function(data){
        assert.isArray(data, 'Array passed to callback function');
        assert.lengthOf(data, 3, 'length of data is 3');
        done();
      });
    });

    test('should call error callback function if provided', function(done){
      result = myp5.loadJSON('../unit/assets/arr.json', function(data){}, function(){
        done();
      });
    });

    test('should pass error object to error callback function', function(done) {
      result = myp5.loadJSON('../unit/assets/arr.json', function(data){
        // should not be called
      }, function(err){
        assert.isObject(err, 'err is an object');
        assert.isFalse(err.ok, 'err.ok is false');
        assert.equal(err.status, 404, 'Error status is 404');
        done();
      });
    });

    /*test('should allow json to override jsonp in 3rd param',
      function(done){

        var url = 'http://localhost:9001/../unit/assets/array.json';
        var datatype = 'json';
        var myCallback = function(resp){
          assert.ok(resp);
          //assert.typeOf(resp,'Object');
          done();
        };
        result = loadJSON(url,myCallback,datatype);
    });*/
  });

  // loadStrings()
  suite('myp5.loadStrings', function() {
    test('should be a function', function() {
      assert.ok(myp5.loadStrings);
      assert.typeOf(myp5.loadStrings, 'function');
    });

    test('should call callback function if provided', function(done){
      result = myp5.loadStrings('../unit/assets/sentences.txt', function(data){
        done();
      });
    });

    test('should pass an Array to callback function', function(){
      result = myp5.loadStrings('../unit/assets/sentences.txt', function(data){
        assert.isArray(data, 'Array passed to callback function');
        assert.lengthOf(data, 68, 'length of data is 68');
      });
    });

    test('should call error callback function if provided', function(done){
      result = myp5.loadStrings('../unit/assets/sen.txt', function(data){}, function(){
        done();
      });
    });

    test('should pass error object to error callback function', function(done) {
      result = myp5.loadStrings('../unit/assets/sen.txt', function(data){
        // should not be called
      }, function(err){
        assert.isObject(err, 'err is an object');
        assert.isFalse(err.ok, 'err.ok is false');
        assert.equal(err.status, 404, 'Error status is 404');
        done();
      });
    });
  });

  // loadXML()
  suite('myp5.loadXML', function(){
    test('should be a function', function(){
      assert.ok(myp5.loadXML);
      assert.typeOf(myp5.loadXML, 'function');
    });

    // Missing reference to parseXML, might need some test suite rethink
    // test('should call callback function if provided', function(done){
    //   result = loadXML('../unit/assets/books.xml', function(data){
    //     done();
    //   });
    // });

    // test('should pass an Object to callback function', function(){
    //   result = loadXML('../unit/assets/books.xml', function(data){
    //     console.log(data);
    //     assert.isObject(data);
    //   });
    // });
  });


  suite('myp5.loadTable',function(){
    var url = '../unit/assets/csv.csv';

    test('should be a function', function(){
      assert.isFunction(myp5.loadTable);
    });

    test('should load a file without options',function(done) {
      var myCallback = function(resp){
        assert.ok(resp);
        done();
      };
      myp5.loadTable(url, myCallback);
    });

    test('the loaded file should be correct',function(done){
      var myCallback = function(resp){
        assert.equal(resp.getRowCount(), 4);
        assert.strictEqual(resp.getRow(1).getString(0), 'David');
        assert.strictEqual(resp.getRow(1).getNum(1), 31);
        done();
      };
      myp5.loadTable(url, myCallback);
    });

    test('using the csv option works', function(done){
      var myCallback = function(resp){
        assert.equal(resp.getRowCount(), 4);
        assert.strictEqual(resp.getRow(1).getString(0), 'David');
        assert.strictEqual(resp.getRow(1).getNum(1), 31);
        done();
      };
      myp5.loadTable(url, 'csv', myCallback);
    });

    test('using the csv and tsv options fails', function(){
      var fn = function(){
        myp5.loadTable(url, 'csv', 'tsv');
      };
      assert.throw(fn, 'Cannot set multiple separator types.');
    });

    test('using the header option works', function(done){
      var myCallback = function(resp){
        assert.equal(resp.getRowCount(), 3);
        assert.strictEqual(resp.getRow(0).getString('name'), 'David');
        assert.strictEqual(resp.getRow(0).getNum('age'), 31);
        done();
      };
      myp5.loadTable(url, 'header', myCallback);
    });

    test('using the header and csv options together works', function(done){
      var myCallback = function(resp){
        assert.equal(resp.getRowCount(), 3);
        assert.strictEqual(resp.getRow(0).getString('name'), 'David');
        assert.strictEqual(resp.getRow(0).getNum('age'), 31);
        done();
      };
      myp5.loadTable(url,'header', 'csv', myCallback);
    });

    test('CSV files should handle commas within quoted fields',function(done){
      var myCallback = function(resp){
        assert.equal(resp.getRowCount(), 4);
        assert.equal(resp.getRow(2).get(0), 'David, Jr.');
        assert.equal(resp.getRow(2).getString(0), 'David, Jr.');
        assert.equal(resp.getRow(2).get(1), '11');
        assert.equal(resp.getRow(2).getString(1), 11);
        done();
      };
      myp5.loadTable(url, myCallback);
    });

    test('CSV files should handle escaped quotes and returns within quoted fields',function(done){
      var myCallback = function(resp){
        assert.equal(resp.getRowCount(), 4);
        assert.equal(resp.getRow(3).get(0), 'David,\nSr. "the boss"');
        done();
      };
      myp5.loadTable(url, myCallback);
    });
  });

});
