describe(" test BSTree", () => {
    before(() => {
//do added tests to git
    })
    it(`test BSTree size`, function () {
        tree.sumSize();
        const act = tree.getSize();
        const exp = 1;
        assert.deepEqual(act, exp);
    });
    it(`test upgrade`, function () {
        tree.upgrade();
        const act = tree.getSize();
        const exp = 0;
        assert.deepEqual(act, exp);
    });
    it(`test init`, function () {
        tree.initList(100)
        const act = tree.rootNode;
        const exp = {
            el:100,
            floor: 1,
            posLeft: 405,
            posTop: 40,
            right:null,
            left:null,
        };
        assert.deepEqual(act, exp);
    });
    it(`test first push`, function () {
        tree.upgrade();
        const act = tree.push(tree.rootNode, 100);
        const exp = {
            el:100,
            floor: 1,
            posLeft: 405,
            posTop: 40,
            right:null,
            left:null,
        };
        assert.deepEqual(act, exp);
    });
    it(`test second push`, function () {
        const act = tree.push(tree.rootNode, 90);
        const exp = {
            el:90,
            floor: 2,
            posLeft: 203,
            posTop: 70,
            right:null,
            left:null,
        };
        assert.deepEqual(act, exp);
    });
    it(`test repeat push`, function () {
        const act = tree.push(tree.rootNode, 90);
        const exp = 90;
        assert.deepEqual(act, exp);
    });
    it(`test third left push`, function () {
        const act = tree.push(tree.rootNode, 80);
        const exp = {
            el:80,
            floor: 3.6666666666666665,
            posLeft: 102,
            posTop: 120,
            right:null,
            left:null,
        };
        assert.deepEqual(act, exp);
    });
    it(`test third right push`, function () {
        const act = tree.push(tree.rootNode, 110);
        const exp = {
            el:110,
            floor: 2,
            posLeft: 607,
            posTop: 70,
            right:null,
            left:null,
        };
        assert.deepEqual(act, exp);
    });
    it(`test Get Node`, function () {
        const act = tree.getNode(tree.rootNode, 110);
        const exp = {
            el:110,
            floor: 2,
            posLeft: 607,
            posTop: 70,
            right:null,
            left:null,
        };
        assert.deepEqual(act, exp);
    });
    it(`test stringID(n)`, function () {
        const act = stringID(0);
        const exp = "id0";
        assert.deepEqual(act, exp);
    });

});
