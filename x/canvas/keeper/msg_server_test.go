package keeper_test

import (
	"context"
	"testing"

	keepertest "canvas/testutil/keeper"
	"canvas/x/canvas/keeper"
	"canvas/x/canvas/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.CanvasKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
