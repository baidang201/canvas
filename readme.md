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

ignite scaffold map storedColors color:uint \
    --index index \
    --module canvas \
    --no-message

//modify canvas/x/canvas/keeper/msg_server_create_canvas.go
```
package keeper

import (
	"context"

	"canvas/x/canvas/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CreateCanvas(goCtx context.Context, msg *types.MsgCreateCanvas) (*types.MsgCreateCanvasResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	canvas, found := k.GetCanvas(ctx)
	if found {
		return nil, types.ErrCanvasAlreadyExist
	}

	canvas = types.Canvas{
		//Id:               msg.Id,
		Width:            msg.Width,
		Height:           msg.Height,
		RefundDuration:   msg.RefundDuration,
		AllowDenomPrefix: msg.AllowDenomPrefix,
		PriceForPoint:    msg.PriceForPoint,
	}
	k.SetCanvas(ctx, canvas)

	return &types.MsgCreateCanvasResponse{
		GameIndex: msg.Id,
	}, nil
}

```

//modify canvas/x/canvas/keeper/msg_server_paint.go
```
package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgPaint = "paint"

var _ sdk.Msg = &MsgPaint{}

func NewMsgPaint(creator string, id string, x uint64, y uint64, amount uint64) *MsgPaint {
	return &MsgPaint{
		Creator: creator,
		Id:      id,
		X:       x,
		Y:       y,
		Amount:  amount,
	}
}

func (msg *MsgPaint) Route() string {
	return RouterKey
}

func (msg *MsgPaint) Type() string {
	return TypeMsgPaint
}

func (msg *MsgPaint) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgPaint) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgPaint) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

```

ignite chain serve


```
cd cmd/canvasd
go build

export alice=$(canvasd keys show alice -a)
echo $alice


canvasd tx canvas create-canvas 0 100 100 "" "" 1 --from $alice --gas auto

canvasd query canvas show-canvas 
```

output
```
  allowDenomPrefix: ""
  height: "100"
  priceForPoint: "1"
  refundDuration: ""
  width: "100"
```

```
canvasd tx canvas paint 0 0 0  0 --from $alice --gas auto
canvasd tx canvas paint 0 0 1   2550 --from $alice --gas auto

canvasd query canvas  list-stored-colors
```
output
```
pagination:
  next_key: null
  total: "0"
storedColors:
- color: "0"
  index: 0/0
- color: "2550"
  index: 0/1
```