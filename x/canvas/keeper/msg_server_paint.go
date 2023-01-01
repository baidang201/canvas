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
