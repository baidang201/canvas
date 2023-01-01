package keeper_test

import (
	"testing"

	testkeeper "canvas/testutil/keeper"
	"canvas/x/canvas/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.CanvasKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
