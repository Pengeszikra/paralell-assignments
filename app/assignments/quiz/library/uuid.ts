export const uuid:() => string
 = () => Math.random().toString(32).slice(-8)
;