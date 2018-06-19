//https://www.geeksforgeeks.org/binary-heap/

class minHeap {

    constructor() {
        this.harr = [] //Heap array
    }

    parent(i) { //Returns index of parent
        return (i-1)/2
    }   

    leftC(i) { //Returns index of left child
        return (2*i+1)
    }

    rightC(i) { //Returns index of right child
        return (2*i+2)
    }

    //Insert a new key 'k'
    insertKey(k) {

        this.harr.push(k)
        let i = this.harr.length - 1

        let parentInd = this.parent(i)

        while (i != 0 && parentInd > harr[i]) {

            this.swap(i, parentInd)

            i = parentInd
            parentInd = this.parent(i)

        }

    }

    // Decreases value of key at index 'i' to new_val.  It is assumed that
    // new_val is smaller than harr[i].
    decreaseKey(i, newVal) {

        this.harr[i] = newVal

        let parentInd = this.parent(i)        

        while (i != 0 && parentInd > harr[i]) {

            this.swap(i, parentInd)

            i = parentInd
            parentInd = this.parent(i)

        }

    }

    extractMin() {

        if (this.harr.length <= 0) return

        if (this.harr.length == 1) return this.harr.pop()

        let root = this.harr[0]
        this.harr[0] = this.harr.pop()
        this.minHeapify(0)

        return root


    }

    deleteKey(i) {

        this.decreaseKey(i, -Infinity)
        this.extractMin()

    }

    minHeapify(i) {

        let l = this.left(i)
        let r = this.right(i)

        let smallest = i

        if (l < this.harr.length && this.harr[l] < this.harr[i]) {
            smallest = l
        }
        if (l < this.harr.length && this.harr[r] < this.harr[smallest]) {
            smallest = r
        }
        if (smallest != i) {
            this.swap(i, smallest)
            minHeapify(smallest)
        }


    }

    //Swap two elements of the heap array
    swap(a, b) {

        let temp = this.harr[a]
        this.harr[a] = this.harr[b]
        this.harr[b] = temp

    }

}