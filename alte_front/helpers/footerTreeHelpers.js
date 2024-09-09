export const flatArrayToFooterTree = (
    arr,
    idProp = "id",
    sortProp = "sort",
) => arr.sort((a, b) => a[sortProp] - b[sortProp]);
