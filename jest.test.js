test('common match',()=>{
    expect(2+2).toBe(4);
    expect(2+2).not.toBe(5);
})

test('to be true or false',()=>{
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
})

test('test number',()=>{
    expect(4).toBeGreaterThan(3)
})

test('object',()=>{
    expect({name:'viking'}).toEqual({name:'viking'})
})