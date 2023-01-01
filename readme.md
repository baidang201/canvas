# canvas
**canvas** is a blockchain built using Cosmos SDK and Tendermint and created with [Ignite CLI](https://ignite.com/cli).

## Get started

```
ignite chain serve
```

`serve` command installs dependencies, builds, initializes, and starts your blockchain in development.

### Configure

Your blockchain in development can be configured with `config.yml`. To learn more, see the [Ignite CLI docs](https://docs.ignite.com).

### Web Frontend

Ignite CLI has scaffolded a Vue.js-based web app in the `vue` directory. Run the following commands to install dependencies and start the app:

```
cd vue
npm install
npm run serve
```

The frontend app is built using the `@starport/vue` and `@starport/vuex` packages. For details, see the [monorepo for Ignite front-end development](https://github.com/ignite/web).

## Release
To release a new version of your blockchain, create and push a new tag with `v` prefix. A new draft release with the configured targets will be created.

```
git tag v0.1
git push origin v0.1
```

After a draft release is created, make your final changes from the release page and publish it.

### Install
To install the latest version of your blockchain node's binary, execute the following command on your machine:

```
curl https://get.ignite.com/username/canvas@latest! | sudo bash
```
`username/canvas` should match the `username` and `repo_name` of the Github repository to which the source code was pushed. Learn more about [the install process](https://github.com/allinbits/starport-installer).

## Learn more

- [Ignite CLI](https://ignite.com/cli)
- [Tutorials](https://docs.ignite.com/guide)
- [Ignite CLI docs](https://docs.ignite.com)
- [Cosmos SDK docs](https://docs.cosmos.network)
- [Developer Chat](https://discord.gg/ignite)


## create process
ignite scaffold chain canvas

cd canvas

ignite scaffold message createCanvas id  width:uint height:uint refundDuration allowDenomPrefix priceForPoint:uint \
    --module canvas \
    --response gameIndex


ignite scaffold message paint id  x:uint y:uint amount:uint \
    --module canvas \
    --response x:int,y:int



ignite scaffold single canvas id  width:uint height:uint refundDuration allowDenomPrefix priceForPoint:uint \
    --module canvas \
    --no-message

ignite scaffold type point x:uint y:uint color  \
    --module canvas \
    --no-message

//modify canvas/x/canvas/keeper/msg_server_create_canvas.go
```
package keeper

import (
	"context"

	"canvas/x/canvas/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CreateCanvas(goCtx context.Context, msg *types.MsgCreateCanvas) (*types.MsgCreateCanvasResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	kvStore := ctx.KVStore(k.storeKey)
	prefixStore := prefix.NewStore(kvStore, []byte("canvas/"))

	if prefixStore.Has([]byte(msg.Id)) {
		return nil, types.ErrCanvasAlreadyExist
	}

	canvas := types.Canvas{
		//Id:               msg.Id,
		Width:            msg.Width,
		Height:           msg.Height,
		RefundDuration:   msg.RefundDuration,
		AllowDenomPrefix: msg.AllowDenomPrefix,
		PriceForPoint:    msg.PriceForPoint,
	}

	bz, err := k.cdc.Marshal(&canvas)
	if err != nil {
		return nil, err
	}

	prefixStore.Set([]byte(msg.Id), bz)

	return &types.MsgCreateCanvasResponse{
		GameIndex: msg.Id,
	}, nil
}
```

//modify canvas/x/canvas/keeper/msg_server_paint.go
```
package keeper

import (
	"context"
  "fmt"

	"canvas/x/canvas/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Paint(goCtx context.Context, msg *types.MsgPaint) (*types.MsgPaintResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	canvas, found := k.GetCanvas(ctx)
	if !found {
		return nil, types.ErrCanvasNotExist
	}

	if msg.X >= canvas.Width || msg.Y >= canvas.Height {
		return nil, types.ErrPointGetOut
	}

	// if !strings.HasPrefix(amount.Denom, canvas.AllowDenomPrefix) {
	// 	return nil, types.ErrInvalidDenomPrefix
	// }

	// if amount.Amount.IsNegative() || !amount.Amount.Equal(sdk.NewInt(int64(canvas.PriceForPoint))) {
	// 	return nil, types.ErrInvalidAmount
	// }

	kvStore := ctx.KVStore(k.storeKey)

	// err = keeper.bankKeeper.SendCoinsFromAccountToModule(ctx, sender, types.ModuleName, sdk.Coins{amount})
	// if err != nil {
	// 	return nil, err
	// }

	prefixStore := prefix.NewStore(kvStore, []byte(fmt.Sprintf("point/%s/", msg.Id)))

	//msg.Amount is RGBint by smith design
	//Blue =  msg.Amount & 255
	//Green = (msg.Amount >> 8) & 255
	//Red =   (msg.Amount >> 16) & 255
	point := types.Point{
		X:     msg.X,
		Y:     msg.Y,
		Color: string(msg.Amount),
	}

	bz, err := k.cdc.Marshal(&point)
	if err != nil {
		return nil, err
	}

	prefixStore.Set([]byte(fmt.Sprintf("%d/%d", msg.X, msg.Y)), bz)

	return &types.MsgPaintResponse{}, nil
}

```

ignite chain serve
