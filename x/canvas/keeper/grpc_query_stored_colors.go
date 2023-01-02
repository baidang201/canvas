package keeper

import (
	"context"

	"canvas/x/canvas/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) StoredColorsAll(c context.Context, req *types.QueryAllStoredColorsRequest) (*types.QueryAllStoredColorsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var storedColorss []types.StoredColors
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	storedColorsStore := prefix.NewStore(store, types.KeyPrefix(types.StoredColorsKeyPrefix))

	pageRes, err := query.Paginate(storedColorsStore, req.Pagination, func(key []byte, value []byte) error {
		var storedColors types.StoredColors
		if err := k.cdc.Unmarshal(value, &storedColors); err != nil {
			return err
		}

		storedColorss = append(storedColorss, storedColors)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllStoredColorsResponse{StoredColors: storedColorss, Pagination: pageRes}, nil
}

func (k Keeper) StoredColors(c context.Context, req *types.QueryGetStoredColorsRequest) (*types.QueryGetStoredColorsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetStoredColors(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetStoredColorsResponse{StoredColors: val}, nil
}
