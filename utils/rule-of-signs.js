$.extend(KhanUtil, {
    // Returns the number of times 0 is a root of the given
    // polynomial.
    getZeroRootMultiplicity: function(p) {
        return p.findMinDegree();
    },

    // Given the polynomial p, computes the maximum number of positive
    // roots it can have according to Descartes' rule of signs.
    getMaxPositiveRoots: function(p) {
        if (p.coefs.length == 0) {
            return 0;
        }
        var minDegree = p.findMinDegree();
        var maxDegree = p.findMaxDegree();
        var sign = (p.coefs[minDegree] > 0) ? +1 : -1;
        var signChanges = 0;
        for (var i = minDegree + 1; i <= maxDegree; ++i) {
            var ai = p.coefs[i];
            if (ai == 0) continue;
            var aSign = (ai > 0) ? +1 : -1;
            if (aSign != sign) {
                sign = aSign;
                ++signChanges;
            }
        }
        return signChanges;
    },

    // Given the polynomial p, returns the polynomial resulting from
    // negating its variable.
    negateVariable: function(p, name) {
        // Flip the sign of odd-power terms.
        var coefs = p.coefs.slice();
        for (var i = 0; i < coefs.length; ++i) {
            if (i % 2 != 0) {
                coefs[i] *= -1;
            }
        }
        return new KhanUtil.Polynomial(
            p.minDegree, p.maxDegree, coefs, p.variable, name);
    },

    // Given the polynomial p and q = negateVariable(p), computes the
    // minimum number of complex roots it can have according to
    // Descartes' rule of signs.
    getMinComplexRoots: function(p, q) {
        return p.findMaxDegree() - KhanUtil.getMaxPositiveRoots(p) -
            KhanUtil.getMaxPositiveRoots(q) -
            KhanUtil.getZeroRootMultiplicity(p);
    }
});
