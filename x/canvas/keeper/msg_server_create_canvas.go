package keeper

import (
	"context"

	"canvas/x/canvas/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CreateCanvas(goCtx context.Context, msg *types.MsgCreateCanvas) (*types.MsgCreateCanvasResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgCreateCanvasResponse{}, nil
}
