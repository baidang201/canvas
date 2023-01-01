package keeper

import (
	"context"

	"canvas/x/canvas/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Paint(goCtx context.Context, msg *types.MsgPaint) (*types.MsgPaintResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgPaintResponse{}, nil
}
