$interpolate服务是一个可以接受三个参数的函数，其中第一个参数是必需的。
 text（字符串）：一个包含字符插值标记的字符串。
 mustHaveExpression（布尔型）：如果将这个参数设为true，当传入的字符串中不含有表
达式时会返回null。
 trustedContext（字符串）：AngularJS会对已经进行过字符插值操作的字符串通过
$sec.getTrusted()方法进行严格的上下文转义。
