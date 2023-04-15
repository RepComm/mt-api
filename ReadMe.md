# mt-api
Type definitions for using the minetest API

## implemented
- minetest global namespace
```ts
minetest.register_on_joinplayer( (player)=>{
  let playername = player:get_player_name();

  minetest.chat_send_player(playername, "Welcome!")
} );
```

## dev-dependencies
- [ts-to-lua](https://github.com/TypeScriptToLua/TypeScriptToLua)
- [lua-types](https://github.com/TypeScriptToLua/lua-types)

## contributors (any contributions welcome, thank you!)
- [repcomm](https://github.com/RepComm)

## also see
- [mt-visible-wielditem-api](https://github.com/RepComm/mt-visible-wielditem-api)
- [mt-3d-armor-api](https://github.com/RepComm/mt-3d-armor-api)

## contributing
Users of minetest's lua api will noticed a lack of `":"` in typescript

Lua uses `obj:method` and `obj.func` to differentiate with `obj` is passed as `self` as the first argument

For instance:
```lua
local obj = {
  method = function (self)
    --"self" refers to obj, similar to "this" in typescript
  end

  func = function ()
    --no self variable here
  end
};

obj.method() -- self will be nil
obj:method() -- self will be obj

obj.func() -- self will be nil
obj:func() -- self will still be nil because its not declared in function args
```

In typescript this is handled by providing a `this` definition:
```ts
interface MinetestGlobal {
  register_on_joinplayer (this: void, cb: MtPlayerJoinCallback): void;
}
declare global minetest: MinetestGlobal;
```

Because
```ts
this: void
```
TypeScript calls to `minetest.register_on_joinplayer()` will properly output:
`minetest.register_on_joinplayer()` in lua

Without providing `this: void`, this would generate:
`minetest:register_on_joinplayer()` as typescript-to-lua compiler assumes we want to provide a `self` reference as first argument

On the flip-side:
```lua
function handle_player_join (player) --player is ObjRef
  player:get_player_name() -- passes player as first arg to get_player_name code
end

minetest.register_on_joinplayer ( handle_player_join )
```

In typescript definitions:
```ts
interface ObjRef {
  //implicit this: ObjRef
  get_player_name(): string;
  //same as
  get_player_name(this: ObjRef): string;
}
```
Which both properly output:

```lua
player:get_player_name()
```
