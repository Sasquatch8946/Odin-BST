const Merge = (function () {
	function iterativeMerge(A, B) {
		const m = A.length;
		const n = B.length;
		let i = 0;
		let j = 0;
		let k = 0;
		let C = [];

		while ((i < m) && (j < n)) {
			if (A[i] < B[j]) {
				C[k++] = A[i++];
			} else {
				C[k++] = B[j++];
			}
		}

		for (; i < m; i++) {
			C[k++] = A[i];
		}

		for (; j < n; j++) {
			C[k++] = B[j];
		}

		return C;
	}

	function mergesort  (arr, newArr = []) {
		if (arr.length === 1) {
			return newArr.concat(arr);
		} else if (arr.length > 0) {
			let end = arr.length / 2;
			let leftside = arr.slice(0, end);
			let rightside = arr.slice(end, arr.length);
			const l = mergesort(leftside);
			const r = mergesort(rightside);
			const result = newArr.concat(iterativeMerge(r, l));
			return result;
		}
	}

	return {
		mergesort,
	}
})();

export default Merge;
