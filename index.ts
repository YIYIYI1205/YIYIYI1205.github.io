function logClass(params) {
  return (target) => {
    console.log(params)
  }
}
function logProperty(params) {
  return (target, attr) => {
    console.log(params)
  }
}
function logMethod(params) {
  return (target, methodName, desc) => {
    console.log(params)
  }
}
function logParams(params) {
  return (target, methodName, paramsIndex) => {
    console.log(params)
  }
}

@logClass('类装饰器1')
@logClass('类装饰器2')
class HttpClient {
  @logProperty('属性装饰器1')
  @logProperty('属性装饰器2')
  public url: string | undefined = 'aaa'

  @logProperty('属性装饰器3')
  public url1: string | undefined = 'aaa'

  @logMethod('方法装饰器1')
  @logMethod('方法装饰器2')
  getData(
    @logParams('参数装饰器1') uuid: string,
    @logParams('参数装饰器2') uuid1: string
  ) {
    console.log(uuid)
  }

  @logMethod('方法装饰器3')
  getData1(@logParams('参数装饰器3') uuid: string) {
    console.log(uuid)
  }
}

@logClass('类装饰器3')
class HttpClient1 {}
