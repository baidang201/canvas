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
