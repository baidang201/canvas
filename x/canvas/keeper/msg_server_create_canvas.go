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
