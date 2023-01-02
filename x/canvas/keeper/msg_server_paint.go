package keeper

import (
	"context"
	"fmt"

	"canvas/x/canvas/types"
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

	//msg.Amount is RGBint by smith design
	//Blue =  msg.Amount & 255
	//Green = (msg.Amount >> 8) & 255
	//Red =   (msg.Amount >> 16) & 255

	index := fmt.Sprintf("%d/%d", msg.X, msg.Y)

	color := types.StoredColors {
		Index: index,
		Color: msg.Amount,
	}

	k.SetStoredColors(ctx, color)

	return &types.MsgPaintResponse{}, nil
}
